import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from './routes';

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');

export const makeAddMessage = ({ value, username, channelId }) => async (dispatch) => {
  const message = { text: value, user: username };
  await axios.post(routes.addMessage(channelId), { data: { attributes: { message } } });
  dispatch(addMessageSuccess());
};

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const makeAddChannel = ({ value }) => async (dispatch) => {
  const channelName = value;
  await axios.post(routes.addChannel(), { data: { attributes: { name: channelName } } });
  dispatch(addMessageSuccess());
};

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const makeRenameChannel = ({ value, id }) => async (dispatch) => {
  const channelName = value;
  await axios.patch(routes.renameChannel(id), { data: { attributes: { name: channelName } } });
  dispatch(renameChannelSuccess());
};

export const deleteChannelSuccess = createAction('DELETE_CHANNEL_SUCCESS');
export const makeDeleteChannel = ({ id }) => async (dispatch) => {
  await axios.delete(routes.deleteChannel(id));
  dispatch(deleteChannelSuccess());
};

export const changeChannelAction = createAction('CHANGE_CHANNEL_ID');
export const makeChangeChannel = id => (dispatch) => {
  dispatch(changeChannelAction({ id }));
};

export const addMessage = createAction('ADD_MESSAGE');
export const addChannel = createAction('ADD_CHANNEL');
export const renameChannel = createAction('RENAME_CHANNEL');
export const removeChannel = createAction('REMOVE_CHANNEL');
