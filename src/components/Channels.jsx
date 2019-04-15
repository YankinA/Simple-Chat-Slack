import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import Channel from './Channel';


const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};
@connect(mapStateToProps)
class Channels extends React.Component {
  // UI state
  state = {
    showModal: false,
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const { showModal } = this.state;
    return (
      <React.Fragment>
        <AddChannelModal showModal={showModal} toggleModal={this.toggleModal} />
        <div className="channels-list row">
          <h5 className="col-12">
            {'Channels '}
            <Button onClick={this.toggleModal} variant="outline-secondary font-weight-bold" size="sm">+</Button>
          </h5>
          {channels.map(channel => (
            <Channel key={channel.id} currentlId={currentChannelId} channel={channel} />))}
        </div>
      </React.Fragment>
    );
  }
}


export default Channels;
