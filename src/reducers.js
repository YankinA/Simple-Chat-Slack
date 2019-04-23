import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from './actions';

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    const { byId, allId } = state;
    return {
      byId: { ...byId, [payload.message.id]: payload.message },
      allId: [...allId, payload.message.id],
    };
  },
  [actions.removeChannel](state, { payload }) {
    const { id } = payload;
    const { byId, allId } = state;
    const filteredById = Object.keys(byId).filter(messageId => Number(messageId) !== id).reduce(
      (acc, messageId) => ({ ...acc, [messageId]: byId[messageId] }), {},
    );
    return { byId: filteredById, allId };
  },
}, 'none');

const channels = handleActions({
  [actions.addChannel](state, { payload }) {
    const { byId, allId } = state;
    return {
      byId: { ...byId, [payload.channel.id]: payload.channel },
      allId: [...allId, payload.channel.id],
    };
  },
  [actions.renameChannel](state, { payload }) {
    const { id, name } = payload.channel;
    const { byId, allId } = state;
    const newChannel = { ...byId[id], name };
    byId[id] = newChannel;
    return { byId, allId };
  },
  [actions.removeChannel](state, { payload }) {
    const { id } = payload;
    const { byId, allId } = state;
    const filteredById = Object.keys(byId).filter(channelId => Number(channelId) !== id).reduce(
      (acc, channelId) => ({ ...acc, [channelId]: byId[channelId] }), {},
    );
    return { byId: filteredById, allId };
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.changeChannelAction](state, { payload }) {
    const defaultChannelId = state;
    return payload.id || defaultChannelId;
  },
  [actions.removeChannel]() {
    const defaultChannelId = 1;
    return defaultChannelId;
  },
}, 'none');

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
