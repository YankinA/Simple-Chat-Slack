import React from 'react';
import { Context } from './index';
import SendMessageForm from './SendMessageForm';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    currentChannelId: state.currentChannelId,
  };
  return props;
};
@connect(mapStateToProps)
class Chat extends React.Component {
  messagesEnd = React.createRef()

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages, currentChannelId } = this.props;
    return (
      <Context.Consumer>
        {({ name }) => (
          <React.Fragment>
            <div className="page-fixer m-4 p-4" />
            <div className="chat col-6 offset-2 mt-4 mb-5 p-4">
              <div clasname="chat-messages border border-warning">
                {!messages.byId || Object.values(messages.byId).map(
                  ({ message, id, channelId }) => {
                    if (channelId === currentChannelId) {
                      return (
                        <div key={id} className="chat-message mt-3">
                          <span className="text-muted">{message.user}</span>
                          <br />
                          <p className="message-text text-justify overflow-hidden">{message.text}</p>
                        </div>
                      );
                    }
                    return null;
                  },
                )
                 }
                <div ref={this.messagesEnd} />
              </div>
            </div>
            <div className="page-fixer m-5 p-5" />
            <div className="fixed-bottom offset-2 col-7">
              <SendMessageForm name={name} />
            </div>
          </React.Fragment>
        )
      }
      </Context.Consumer>
    );
  }
}

export default Chat;
