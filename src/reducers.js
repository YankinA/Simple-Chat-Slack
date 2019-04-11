import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from './actions';

const loadMessagesState = handleActions({
  [actions.loadMessagesRequest]() {
    return 'requested';
  },
  [actions.loadMessagesFailure]() {
    return 'failed';
  },
  [actions.loadMessagesSuccess]() {
    return 'finiched';
  },
}, 'none');

const messages = handleActions({
  [actions.loadMessagesSuccess](state, { payload }) {
    return [...state, payload.message];
  },
  [actions.addMessageSuccess]() {
  },
}, 'none');

const channels = handleActions({
  [actions.addChannelsSuccess]() {
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.currentChannelIdSuccess]() {
  },
}, 'none');

export default combineReducers({
  loadMessagesState,
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
