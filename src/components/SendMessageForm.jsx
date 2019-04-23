import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import 'babel-polyfill';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({ form: 'SendMessage' })
class SendMessageForm extends React.Component {
  sendMessage = async (values) => {
    const {
      makeAddMessage,
      reset,
      name,
      currentChannelId,
    } = this.props;
    try {
      await makeAddMessage({ value: values.text, username: name, channelId: currentChannelId });
      reset();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form-send-message" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group">
          <Field
            disabled={submitting}
            required
            maxLength="150"
            autoFocus
            name="text"
            component="textarea"
            rows="3"
            type="text"
            className="form-control border-info border-right-0 shadow-lg"
            placeholder="Type your message here..."
          />
          <button
            disabled={submitting}
            type="submit"
            className="btn btn-outline-info rounded-0 shadow"
            id="btn-chat"
          >
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default SendMessageForm;
