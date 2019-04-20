import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from './routes';

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');

export const addMessage = ({ value, username, channelId }) => async (dispatch) => {
  const message = { text: value, user: username };
  await axios.post(routes.addMessage(channelId), { data: { attributes: { message } } });
  dispatch(addMessageSuccess());
};

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannel = ({ value }) => async (dispatch) => {
  const channelName = value;
  await axios.post(routes.addChannel(), { data: { attributes: { name: channelName } } });
  dispatch(addMessageSuccess());
};

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannel = ({ value, id }) => async (dispatch) => {
  const channelName = value;
  await axios.patch(routes.renameChannel(id), { data: { attributes: { name: channelName } } });
  dispatch(renameChannelSuccess());
};

export const deleteChannelSuccess = createAction('DELETE_CHANNEL_SUCCESS');
export const deleteChannel = ({ id }) => async (dispatch) => {
  await axios.delete(routes.deleteChannel(id));
  dispatch(deleteChannelSuccess());
};

export const changeChannelAction = createAction('CHANGE_CHANNEL_ID');
export const changeChannel = id => (dispatch) => {
  dispatch(changeChannelAction({ id }));
};

export const messageLoadingSocket = createAction('MESSAGE_LOADING_SOCKET');
export const channelLoadingSocket = createAction('CHANNEL_LOADING_SOCKET');
export const renameChannelSuccessSocket = createAction('RENAME_CHANNEL_SUCCESS_SOCKET');
export const removeChannelSuccessSocket = createAction('REMOVE_CHANNEL_SUCCESS_SOCKET');
