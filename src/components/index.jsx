import React from 'react';
import { render } from 'react-dom';
import Channels from './Channels';
import Chat from './Chat';

export default (gon) => {
  class App extends React.Component {
    state = {
      channels: [],
    }

    componentWillMount() {
      this.setState({ channels: gon.channels });
      this.setState({ messages: gon.messages });
    }

    render() {
      const { channels, messages } = this.state;
      return (
        <React.Fragment>
          <nav className="col-3">
            User: Vasy Petin
            <Channels channels={channels} />
          </nav>
          <Chat messages={messages} />
        </React.Fragment>
      );
    }
  }

  render(<App gon={gon} />, document.querySelector('.container'));
};
