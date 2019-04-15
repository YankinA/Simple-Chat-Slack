import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionCreators = {
  addChannel: actions.addChannel,
};

const mapStateToProps = (state) => {
  const props = {
    state,
  };
  return props;
};

class AddChannelModal extends React.Component {
  addChannel = async (values) => {
    const {
      addChannel,
      toggleModal,
      reset,
    } = this.props;
    reset();
    toggleModal();
    try {
      await addChannel({ value: values.text });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const {
      showModal,
      toggleModal,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>New channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(this.addChannel)}>
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
                placeholder="Type new channel here..."
              />
              <button disabled={submitting} type="submit" className="btn btn-outline-secondary rounded-0">Add</button>
            </div>
            <hr />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}


const connectedAddChannelModal = connect(mapStateToProps, actionCreators)(AddChannelModal);

export default reduxForm({
  form: 'AddChannelModal',
})(connectedAddChannelModal);
