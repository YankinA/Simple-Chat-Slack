import React from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    messages: state.messages,
  };
  return props;
};
@connect(mapStateToProps)
class Channel extends React.Component {
  // UI state
  state = {
    modalType: null,
  };

changeChannel = id => () => {
  const { changeChannel } = this.props;
  changeChannel(id);
};

  toggleModalRename = () => {
    const { modalType } = this.state;
    const modalState = modalType === 'rename' ? null : 'rename';
    this.setState({ modalType: modalState });
  }

  toggleModalDelete = () => {
    const { modalType } = this.state;
    const modalState = modalType === 'delete' ? null : 'delete';
    this.setState({ modalType: modalState });
  }


  render() {
    const { channel, currentChannelId } = this.props;
    const { modalType } = this.state;
    return (
      <div className="col-12">
        <RenameChannelModal
          modalType={modalType}
          toggleModalRename={this.toggleModalRename}
          id={channel.id}
        />
        <DeleteChannelModal
          modalType={modalType}
          toggleModalDelete={this.toggleModalDelete}
          id={channel.id}
          name={channel.name}
        />
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle className="" split variant="" />
          <Dropdown.Menu className="shadow">
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
