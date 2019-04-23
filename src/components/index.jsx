import React from 'react';
import { render } from 'react-dom';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import {
  compose,
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { normalize, schema } from 'normalizr';
import App from './App';
import reducers from '../reducers';
import * as actions from '../actions';

const getName = () => {
  if (cookies.get('name') === undefined) {
    cookies.set('name', faker.name.findName(), { expires: 1 });
  }
  return cookies.get('name');
};

export const Context = React.createContext();

export default (gon) => {
  const channel = new schema.Entity('channels');
  const message = new schema.Entity('messages');
  const modifiedState = {
    channels: [channel],
    messages: [message],
  };

  const normalizeState = normalize(gon, modifiedState);

  const initialState = {
    channels: {
      byId: normalizeState.entities.channels,
      allId: normalizeState.result.messages,
    },
    currentChannelId: gon.currentChannelId,
    messages: {
      byId: normalizeState.entities.messages,
      allId: normalizeState.result.messages,
    },
  };

  /* eslint-disable no-underscore-dangle */
  const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(
    reducers,
    initialState,
    reduxDevtools(
      applyMiddleware(thunk),
    ),
  );

  const socket = io.connect('/');
  socket.on('newMessage', (response) => {
    const newMessage = {
      id: response.data.attributes.id,
      message: {
        text: response.data.attributes.message.text,
        user: response.data.attributes.message.user,
      },
      channelId: response.data.attributes.channelId,
    };
    store.dispatch(actions.addMessage({ message: newMessage }));
  });
  socket.on('newChannel', (response) => {
    const newChannel = {
      id: response.data.id,
      name: response.data.attributes.name,
      removable: response.data.attributes.removable,
    };
    store.dispatch(actions.addChannel({ channel: newChannel }));
  });
  socket.on('renameChannel', (response) => {
    const newNameChannel = {
      id: response.data.id,
      name: response.data.attributes.name,
    };
    store.dispatch(actions.renameChannel({ channel: newNameChannel }));
  });
  socket.on('removeChannel', (response) => {
    const { id } = response.data;
    store.dispatch(actions.removeChannel({ id }));
  });

  store.dispatch(actions.makeChangeChannel());
  const nameUser = getName();
  render(
    <Provider store={store}>
      <Context.Provider value={{ name: nameUser }}>
        <App />
      </Context.Provider>
    </Provider>, document.querySelector('.container-fluid'),
  );
};
