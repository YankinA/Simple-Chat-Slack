import React from 'react';

const Channels = ({ channels }) => (
  <div clasname="channels-list">
    Channels
    {channels.map(channel => (
      <div key={channel.id} className="channels-item">
        {'# '}
        {channel.name}
      </div>
    ))
  }
  </div>
);


export default Channels;
