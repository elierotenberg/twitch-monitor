import React from 'react';
import { component } from 'react-nexus';
import pure from 'pure-render-decorator';

@component()
@pure
class ChannelInput extends React.Component {
  static displayName = 'ChannelInput';

  static propTypes = {
    nexus: React.PropTypes.shape({
      local: React.PropTypes.shape({
        dispatchAction: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  addChannel(e) {
    e.preventDefault();
    const { nexus } = this.props;
    const { input } = this.state;
    if(input.length === 0) {
      return;
    }
    nexus.local.dispatchAction('/channels/add', { channel: input });
    this.setState({ input: '' });
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    const { input } = this.state;
    return <form className='ChannelInput ui form' onSubmit={(e) => this.addChannel(e)}>
      <div className='ui action input'>
        <input type='text' placeholder='Twitch channel ID' value={input} onChange={(e) => this.updateInput(e)} />
        <button className='ui icon button' onClick={(e) => this.addChannel(e)}>
          <i className='add circle icon' />
        </button>
      </div>
    </form>;
  }
}

export default ChannelInput;
