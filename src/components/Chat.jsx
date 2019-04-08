import React from 'react';

const messages = [{ id: 1, message: 'Cogito, ergo sum =)' }, { id: 2, message: 'Nulla dies sine lineaTu quoque BruteTu quoque BruteTu quoque BruteTu quoque BruteNulla dies sine linea' }, { id: 3, message: '=( Tu quoque Brute' }];

const Chat = (/* { messages } */) => (
  <div className="chat col-7">
    <div clasname="chat-messages">
      {messages.map(message => (
        <div key={message.id} className="chat-message mt-3">
          {message.message}
        </div>
      ))
    }
    </div>
    <div className="input-group mt-4">
      <input id="btn-input" type="text" className="form-control border-secondary border-right-0" placeholder="Type your message here..." />
      <button type="button" className="btn btn-outline-secondary rounded-0" id="btn-chat">Send</button>
    </div>
  </div>
);


export default Chat;
