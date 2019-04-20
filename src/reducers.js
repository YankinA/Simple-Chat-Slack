import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from './actions';

const messages = handleActions({
  [actions.messageLoadingSocket](state, { payload }) {
    const { byId, allId } = state;
    return {
      byId: { ...byId, [payload.message.id]: payload.message },
      allId: [...allId, payload.message.id],
    };
  },
  [actions.removeChannelSuccessSocket](state, { payload }) {
    const { id } = payload;
    const { byId, allId } = state;
    allId.forEach(messageId => byId[messageId].channelId !== id || delete byId[messageId]);
    return { byId, allId };
  },
}, 'none');

const channels = handleActions({
  [actions.channelLoadingSocket](state, { payload }) {
    const { byId, allId } = state;
    return {
      byId: { ...byId, [payload.channel.id]: payload.channel },
      allId: [...allId, payload.channel.id],
    };
  },
  [actions.renameChannelSuccessSocket](state, { payload }) {
    const { id, name } = payload.channel;
    const { byId, allId } = state;
    const newChannel = { ...byId[id], name };
    byId[id] = newChannel;
    return { byId, allId };
  },
  [actions.removeChannelSuccessSocket](state, { payload }) {
    const { id } = payload;
    const { byId, allId } = state;
    delete byId[id];
    return { byId, allId };
  },
}, 'none');

const currentChannelId = handleActions({
  [actions.changeChannelAction](state, { payload }) {
    const defaultChannelId = state;
    return payload.id || defaultChannelId;
  },
  [actions.removeChannelSuccessSocket]() {
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
