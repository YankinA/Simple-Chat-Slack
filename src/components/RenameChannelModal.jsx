import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    state,
  };
  return props;
};
 @connect(mapStateToProps)
 @reduxForm({ form: 'RenameChannelModal' })
class RenameChannelModal extends React.Component {
  renameChannel = id => async (values) => {
    const {
      reset,
      makeRenameChannel,
      toggleModalRename,
    } = this.props;
    try {
      await makeRenameChannel({ value: values.text, id });
      reset();
      toggleModalRename();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      modalType,
      toggleModalRename,
      submitting,
      handleSubmit,
      id,
    } = this.props;
    const showModal = modalType === 'rename' || false;
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

export default RenameChannelModal;
