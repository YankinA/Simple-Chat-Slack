import React from 'react';
import { render } from 'react-dom';
import faker from 'faker';
import cookies from 'js-cookie';
import { Provider } from 'react-redux';
import {
  compose,
  applyMiddleware,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from '../reducers';
import {
  loadMessages,
  loadChannels,
  changeChannel,
  renameChannelSocket,
  removeChannelSocket,
} from '../actions';

const getName = () => {
  if (cookies.get('name') === undefined) {
    cookies.set('name', faker.name.findName(), { expires: 1 });
  }
  return cookies.get('name');
};

export const Context = React.createContext();

export default (gon) => {
  const initialState = {
    channels: gon.channels,
    currentChannelId: gon.currentChannelId,
    messages: gon.messages,
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
  store.dispatch(loadMessages());
  store.dispatch(loadChannels());
  store.dispatch(changeChannel());
  store.dispatch(renameChannelSocket());
  store.dispatch(removeChannelSocket());

  const nameUser = getName();
  render(
    <Provider store={store}>
      <Context.Provider value={{ name: nameUser }}>
        <App />
      </Context.Provider>
    </Provider>, document.querySelector('.container-fluid'),
  );
};
