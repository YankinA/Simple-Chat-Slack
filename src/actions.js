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
