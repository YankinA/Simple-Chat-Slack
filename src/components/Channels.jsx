import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};
@connect(mapStateToProps)
class Channels extends React.Component {
  method = () => {}

  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <div clasname="channels-list">
        <h3>Channels</h3>
        {channels.map(channel => (
          <div key={channel.id} className="channels-item">
            {channel.id === currentChannelId ? `#${channel.name.toUpperCase()}` : `# ${channel.name}`}
          </div>
        ))
    }
      </div>
    );
  }
}


export default Channels;
