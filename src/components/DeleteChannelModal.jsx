import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionCreators = {
  deleteChannel: actions.deleteChannel,
};

const mapStateToProps = (state) => {
  const props = {
    state,
  };
  return props;
};

class DeleteChannelModal extends React.Component {
  deleteChannel = id => async () => {
    const {
      deleteChannel,
      toggleModalDelete,
    } = this.props;
    toggleModalDelete();
    try {
      await deleteChannel({ id });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      showModal,
      toggleModalDelete,
      submitting,
      handleSubmit,
      id,
      name,
    } = this.props;

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

const connectedDeleteChannelModal = connect(mapStateToProps, actionCreators)(DeleteChannelModal);

export default reduxForm({
  form: 'DeleteChannelModal',
})(connectedDeleteChannelModal);
