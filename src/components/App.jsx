import React from 'react';
import Channels from './Channels';
import Chat from './Chat';
import { Context } from './index';

class App extends React.Component {
  method = () => {}

  render() {
    return (
      <Context.Consumer>
        {({ name }) => (
          <React.Fragment>
            <div className=".nav-chat-wrapper col-2">
              <nav className="nav-chat">
                <p>{name}</p>
                <Channels />
              </nav>
            </div>
            <Chat />
          </React.Fragment>
        )}
      </Context.Consumer>
    );
  }
}

export default App;
