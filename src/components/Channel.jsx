import React from 'react';
import { component } from 'react-nexus';
import { styles } from 'react-statics-styles';
import pure from 'pure-render-decorator';
import jsonp from 'jsonp';
import _ from 'lodash';
const __DEV__ = process.env.NODE_ENV === 'development';
const __BROWSER__ = (typeof window === 'object');

const REFETCH_INTERVAL = 30000;

@styles({
  '.Channel > h3': {
    cursor: 'pointer',
  },
  '.Channel > object': {
    width: '100%',
    border: 0,
    display: 'block',
  },
})
@component()
@pure
class Channel extends React.Component {
  static displayName = 'Channel';

  static propTypes = {
    channel: React.PropTypes.object.isRequired,
    nexus: React.PropTypes.shape({
      local: React.PropTypes.shape({
        dispatchAction: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      game: '???',
      viewers: '???',
    };

    if(__BROWSER__) {
      this.refetchReq = null;
      this.refetchInterval = setInterval(() => this.refetch(this.props), REFETCH_INTERVAL);
      this.refetch(props);
    }

  }

  componentWillReceiveProps(nextProps) {
    if(__BROWSER__) {
      this.refetch(nextProps);
    }
  }

  componentWillUnmount() {
    if(__BROWSER__) {
      clearInterval(this.refetchInterval);
      this.refetchInterval = null;
      if(this.refetchReq) {
        this.refetchReq();
        this.refetchReq = null;
      }
    }
  }

  refetch({ channel }) {
    if(__BROWSER__) {
      if(this.refetchReq) {
        this.refetchReq();
      }

      this.refetchReq = jsonp(`https://api.twitch.tv/kraken/streams/${channel}`, {
        callback: _.uniqueId('callback'),
      }, (err, res) => {
        if(this.refetchReq) {
          this.refetchReq = null;
        }
        if(err) {
          if(__DEV__) {
            throw err;
          }
          console.error(err);
          return;
        }
        const { stream } = res;
        if(stream) {
          const { game, viewers } = stream;
          this.setState({ game, viewers });
          return;
        }
      });
    }
  }

  removeChannel(e) {
    e.preventDefault();
    const { nexus } = this.props;
    const { channel } = this.props;
    nexus.local.dispatchAction('/channels/remove', { channel });
  }

  render() {
    const { game, viewers } = this.state;
    const { channel } = this.props;
    return <div className='Channel'>
      <object
          data='//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf'
          type='application/x-shockwave-flash'>
        <param name='allowFullScreen' value='true' />
        <param name='allowNetworking' value='all' />
        <param name='allowScriptAccess' value='always' />
        <param name='movie' value='//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf' />
        <param name='flashvars' value={`channel=${channel}&start_volume=0&auto_play=true`} />
      </object>
      <h3 className='ui header' onClick={(e) => this.removeChannel(e)}>
        <i className='remove circle icon' />
        <div className='content'>{channel}</div>
      </h3>
      <h5 className='ui header'>{game}</h5>
      <h5 className='ui header'>
        <i className='twitch icon' />
        <div className='content'>{viewers}</div>
      </h5>
    </div>;
  }
}

export default Channel;
