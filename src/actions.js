import { createAction } from 'redux-actions';
import axios from 'axios';
import io from 'socket.io-client';

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');

export const addMessage = ({ value, username, channelId }) => async (dispatch) => {
  const url = `/api/v1/channels/${channelId}/messages`;
  const message = { text: value, user: username };
  await axios.post(url, { data: { attributes: { message } } });
  dispatch(addMessageSuccess());
};

export const loadMessagesRequest = createAction('LOAD_MESSAGE_REQUEST');
export const loadMessagesSuccess = createAction('LOAD_MESSAGE_SUCCESS');
export const loadMessagesFailure = createAction('LOAD_MESSAGE_FAILURE');

export const loadMessages = () => async (dispatch) => {
  dispatch(loadMessagesRequest());
  const socket = io.connect('/');
  try {
    await socket.on('newMessage', (response) => {
      const newMessage = {
        id: response.data.attributes.id,
        message: {
          text: response.data.attributes.message.text,
          user: response.data.attributes.message.user,
        },
        channelId: response.data.attributes.channelId,
      };
      dispatch(loadMessagesSuccess({ message: newMessage }));
    });
  } catch (e) {
    dispatch(loadMessagesFailure());
    throw e;
  }
};

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannel = ({ value }) => async (dispatch) => {
  const url = '/api/v1/channels';
  const channelName = value;
  await axios.post(url, { data: { attributes: { name: channelName } } });
  dispatch(addMessageSuccess());
};

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannel = ({ value, id }) => async (dispatch) => {
  const url = `/api/v1/channels/${id}`;
  const channelName = value;
  await axios.patch(url, { data: { attributes: { name: channelName } } });
  dispatch(renameChannelSuccess());
};

export const deleteChannelSuccess = createAction('DELETE_CHANNEL_SUCCESS');
export const deleteChannel = ({ id }) => async (dispatch) => {
  const url = `/api/v1/channels/${id}`;
  await axios.delete(url);
  dispatch(deleteChannelSuccess());
};

export const loadChannelsRequest = createAction('LOAD_CHANNEL_REQUEST');
export const loadChannelsSuccess = createAction('LOAD_CHANNEL_SUCCESS');
export const loadChannelsFailure = createAction('LOAD_CHANNEL_FAILURE');

export const loadChannels = () => async (dispatch) => {
  dispatch(loadChannelsRequest());
  const socket = io.connect('/');
  try {
    await socket.on('newChannel', (response) => {
      const newChannel = {
        id: response.data.id,
        name: response.data.attributes.name,
        removable: response.data.attributes.removable,
      };
      dispatch(loadChannelsSuccess({ channel: newChannel }));
    });
  } catch (e) {
    dispatch(loadChannelsFailure());
    throw e;
  }
};

export const renameChannelRequestSocket = createAction('RENAME_CHANNEL_REQUEST_SOCKET');
export const renameChannelSuccessSocket = createAction('RENAME_CHANNEL_SUCCESS_SOCKET');
export const renameChannelFailureSocket = createAction('RENAME_CHANNEL_FAILURE_SOCKET');

export const renameChannelSocket = () => async (dispatch) => {
  dispatch(renameChannelRequestSocket());
  const socket = io.connect('/');
  try {
    await socket.on('renameChannel', (response) => {
      const newNameChannel = {
        id: response.data.id,
        name: response.data.attributes.name,
      };
      dispatch(renameChannelSuccessSocket({ channel: newNameChannel }));
    });
  } catch (e) {
    dispatch(renameChannelFailureSocket());
    throw e;
  }
};

export const removeChannelRequestSocket = createAction('REMOVE_CHANNEL_REQUEST__SOCKET');
export const removeChannelSuccessSocket = createAction('REMOVE_CHANNEL_SUCCESS_SOCKET');
export const removeChannelFailureSocket = createAction('REMOVE_CHANNEL_FAILURE_SOCKET');

export const removeChannelSocket = () => async (dispatch) => {
  dispatch(removeChannelRequestSocket());
  const socket = io.connect('/');
  try {
    await socket.on('removeChannel', (response) => {
      const { id } = response.data;
      dispatch(removeChannelSuccessSocket({ id }));
    });
  } catch (e) {
    dispatch(removeChannelFailureSocket());
    throw e;
  }
};

export const changeChannelAction = createAction('CHANGE_CHANNEL_ID');
export const changeChannel = id => (dispatch) => {
  dispatch(changeChannelAction({ id }));
};
