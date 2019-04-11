import React from 'react';
import { connect } from 'react-redux';
import { Context } from './index';
import SendMessageForm from './SendMessageForm';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};
@connect(mapStateToProps)
class Chat extends React.Component {
   method = () => {}

   render() {
     const { messages } = this.props;
     return (
       <Context.Consumer>
         {({ name }) => (
           <div className="chat col-10">
             <div clasname="chat-messages">
               {messages.map(({ message, id }) => (
                 <div key={id} className="chat-message mt-3">
                   {message.user}
                   <br />
                   <p className="message-text">{message.text}</p>
                 </div>
               ))
                 }
               <div className="page-fixer" />
             </div>
             <div className="test" />
             <SendMessageForm name={name} />
           </div>
         )
       }
       </Context.Consumer>
     );
   }
}

export default Chat;
