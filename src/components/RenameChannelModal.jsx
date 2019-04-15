import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionCreators = {
  renameChannel: actions.renameChannel,
};

const mapStateToProps = (state) => {
  const props = {
    state,
  };
  return props;
};

class RenameChannelModal extends React.Component {
  renameChannel = id => async (values) => {
    const {
      renameChannel,
      toggleModalRename,
    } = this.props;
    toggleModalRename();
    try {
      await renameChannel({ value: values.text, id });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      showModal,
      toggleModalRename,
      submitting,
      handleSubmit,
      id,
    } = this.props;

    return (
      <Modal show={showModal} onHide={toggleModalRename}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-add-channel" onSubmit={handleSubmit(this.renameChannel(id))}>
            <div className="input-group mt-4">
              <Field
                disabled={submitting}
                required
                maxlength="10"
                autoFocus
                name="text"
                component="input"
                type="text"
                className="form-control border-secondary border-right-0"
                placeholder="Type new name channel here..."
              />
              <button disabled={submitting} type="submit" className="btn btn-outline-secondary rounded-0" id="btn-chat">Rename</button>
            </div>
            <hr />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const connectedRenameChannelModal = connect(mapStateToProps, actionCreators)(RenameChannelModal);

export default reduxForm({
  form: 'RenameChannelModal',
})(connectedRenameChannelModal);
