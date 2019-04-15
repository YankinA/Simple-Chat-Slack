import React from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const actionCreators = {
  changeChannel: actions.changeChannel,
};

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    messages: state.messages,
  };
  return props;
};
@connect(mapStateToProps, actionCreators)
class Channel extends React.Component {
  // UI state
  state = {
    showModalRename: false,
    showModalDelete: false,
  };

changeChannel = id => () => {
  const { changeChannel } = this.props;
  changeChannel(id);
};

  toggleModalRename = () => {
    const { showModalRename } = this.state;
    this.setState({ showModalRename: !showModalRename });
  }

  toggleModalDelete = () => {
    const { showModalDelete } = this.state;
    this.setState({ showModalDelete: !showModalDelete });
  }


  render() {
    const { channel, currentChannelId } = this.props;
    const { showModalRename, showModalDelete } = this.state;
    return (
      <div className="col-12">
        <RenameChannelModal
          showModal={showModalRename}
          toggleModalRename={this.toggleModalRename}
          id={channel.id}
        />
        <DeleteChannelModal
          showModal={showModalDelete}
          toggleModalDelete={this.toggleModalDelete}
          id={channel.id}
          name={channel.name}
        />
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle className="" split variant="" />
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={this.toggleModalRename}>Rename</Dropdown.Item>
            {channel.removable ? (
              <React.Fragment>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={this.toggleModalDelete}>Delete</Dropdown.Item>
              </React.Fragment>
            ) : null}
          </Dropdown.Menu>
          <Button className="" variant="" onClick={this.changeChannel(channel.id)}>
            {channel.id === currentChannelId ? `# ${channel.name.toUpperCase()}` : `# ${channel.name}`}
          </Button>
        </Dropdown>
      </div>
    );
  }
}


export default Channel;
