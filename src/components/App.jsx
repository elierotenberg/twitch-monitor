import LocalFlux from 'nexus-flux/adapters/Local';
import { root, component } from 'react-nexus';
import React from 'react';
import { Lifespan, Remutable } from 'nexus-flux';
import pure from 'pure-render-decorator';
import { styles } from 'react-statics-styles';
import transform from 'react-transform-props';
import _ from 'lodash';
const __BROWSER__ = (typeof window === 'object');

import Channel from './Channel';
import ChannelInput from './ChannelInput';

@styles({
  '*': {
    boxSizing: 'border-box',
  },
})
@root(({ window }) => {
  const lifespan = new Lifespan();
  // local flux
  const localStores = {
    '/channels': new Remutable({}),
  };
  const { localStorage = null } = window || {};

  function writeToLocalStorage(channels) {
    localStorage.setItem('/channels', JSON.stringify(channels));
  }

  function readFromLocalStorage() {
    return JSON.parse(localStorage.getItem('/channels'));
  }

  const localServer = new LocalFlux.Server(localStores);
  const localClient = new LocalFlux.Client(localServer);
  lifespan.onRelease(() => localClient.lifespan.release());
  lifespan.onRelease(() => localServer.lifespan.release());

  _.each(localStores, (value, key) =>
    localServer.dispatchUpdate(key, value.commit())
  );

  localServer.on('action', ({ path, params }) => {
    if(path === '/channels/add') {
      const { channel } = params;
      channel.should.be.a.String;
      channel.length.should.be.above(0);
      localServer.dispatchUpdate('/channels', localStores['/channels'].set(channel, channel).commit());
      writeToLocalStorage(localStores['/channels'].head.toJS());
    }
    if(path === '/channels/remove') {
      const { channel } = params;
      channel.should.be.a.String;
      channel.length.should.be.above(0);
      localServer.dispatchUpdate('/channels', localStores['/channels'].delete(channel).commit());
      localStorage.setItem('/channels', JSON.stringify(localStores['/channels'].head.toJS()));
    }
  });

  if(__BROWSER__) {
    if(!localStorage.getItem('/channels')) {
      writeToLocalStorage({});
    }
    _.each(readFromLocalStorage(), (channel) => localStores['/channels'].set(channel, channel));
    localServer.dispatchUpdate('/channels', localStores['/channels'].commit());
  }

  const nexus = {
    local: localClient,
  };

  return { nexus, lifespan };
})
@component(() => ({
  channels: ['local://channels', {}],
}))
@transform(({ channels }) => ({
  channels: channels.toJS(),
}))
@pure
class App extends React.Component {
  static displayName = 'App';

  static propTypes = {
    channels: React.PropTypes.object.isRequired,
  };

  render() {
    const { channels } = this.props;
    return <div className='ui page grid'>
      {
        _.map(channels, (channel, key) => <div className='ui four wide column' key={key}>
            <Channel channel={channel} />
        </div>)
      }
      <div className='ui four wide column'>
        <ChannelInput />
      </div>
    </div>;
  }
}

export default App;
