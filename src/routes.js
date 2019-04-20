const rootAPI = '/api/v1';

export default {
  addMessage: channelId => `${rootAPI}/channels/${channelId}/messages`,
  addChannel: () => `${rootAPI}/channels`,
  renameChannel: id => `${rootAPI}/channels/${id}`,
  deleteChannel: id => `${rootAPI}/channels/${id}`,
};
