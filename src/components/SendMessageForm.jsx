import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import { connect } from 'react-redux';
import * as actions from '../actions';

const actionCreators = {
  addMessage: actions.addMessage,
};

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
  };
  return props;
};

class SendMessageForm extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 10000);
  }

  sendMessage = async (values) => {
    const {
      addMessage,
      reset,
      name,
      currentChannelId,
    } = this.props;
    reset();
    window.scrollTo(0, 10000);
    try {
      await addMessage({ value: values.text, username: name, channelId: currentChannelId });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form-send-message" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group mt-4">
          <Field
            disabled={submitting}
            autoFocus
            name="text"
            component="input"
            type="text"
            className="form-control border-secondary border-right-0"
            placeholder="Type your message here..."
          />
          <button disabled={submitting} type="submit" className="btn btn-outline-secondary rounded-0" id="btn-chat">Send</button>
        </div>
      </form>
    );
  }
}
const ConnectedSendMessageForm = connect(mapStateToProps, actionCreators)(SendMessageForm);

export default reduxForm({
  form: 'SendMessage',
})(ConnectedSendMessageForm);
