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

const loadChannelsState = handleActions({
  [actions.loadChannelsRequest]() {
    return 'requested';
  },
  [actions.loadChannelsFailure]() {
    return 'failed';
  },
  [actions.loadChannelsSuccess]() {
    return 'finiched';
  },
}, 'none');

const messages = handleActions({
  [actions.loadMessagesSuccess](state, { payload }) {
    return [...state, payload.message];
  },
  [actions.removeChannelSuccessSocket](state, { payload }) {
    const { id } = payload;
    return state.filter(m => m.channelId !== id);
  },
}, 'none');

const channels = handleActions({
  [actions.loadChannelsSuccess](state, { payload }) {
    return [...state, payload.channel];
  },
  [actions.renameChannelSuccessSocket](state, { payload }) {
    const { id, name } = payload.channel;
    return state.map((channel) => {
      if (channel.id === id) {
        return { ...channel, name };
      }
      return channel;
    });
  },
  [actions.removeChannelSuccessSocket](state, { payload }) {
    const { id } = payload;
    return state.filter(c => c.id !== id);
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.changeChannelAction](state, { payload }) {
    return payload.id || 1;
  },
}, 'none');

export default combineReducers({
  loadMessagesState,
  loadChannelsState,
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
