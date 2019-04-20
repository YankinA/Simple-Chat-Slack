import React from 'react';
import { Badge } from 'react-bootstrap';
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
            <div className="nav-chat-wrapper col-2 position-fixed h-100 shadow">
              <nav className="nav-chat pt-5 ">
                <p className="nav-user-name mt-5 mb-4">
                  {`${name} `}
                  <Badge variant="info shadow">online</Badge>
                </p>
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
