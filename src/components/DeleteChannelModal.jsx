import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    state,
  };
  return props;
};
 @connect(mapStateToProps)
 @reduxForm({ form: 'DeleteChannelModal' })
class DeleteChannelModal extends React.Component {
  deleteChannel = id => async () => {
    const {
      makeDeleteChannel,
      toggleModalDelete,
    } = this.props;
    try {
      await makeDeleteChannel({ id });
      toggleModalDelete();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      modalType,
      toggleModalDelete,
      submitting,
      handleSubmit,
      id,
      name,
    } = this.props;
    const showModal = modalType === 'delete' || false;
    return (
      <Modal show={showModal} onHide={toggleModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{name.toUpperCase()}</Modal.Body>
        <Modal.Footer>
          <form onSubmit={handleSubmit(this.deleteChannel(id))}>
            <Button variant="btn btn-outline-secondary rounded-0" onClick={toggleModalDelete}>
                Close
            </Button>
            <Button disabled={submitting} type="submit" variant="btn btn-outline-secondary rounded-0 ml-2">
                Delete
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    );
  }
 }

export default DeleteChannelModal;
