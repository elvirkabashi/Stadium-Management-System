import React from 'react';
import './LiveChatWindow.css';

const LiveChat = ({ isOpen, handleClose }) => {
  return (
    <div className={`live-chat ${isOpen ? 'open' : ''}`}>
      <div className="live-chat-header">
        <h4>Live Chat</h4>
        <button onClick={handleClose}>Close</button>
      </div>
      <div className="live-chat-body">
        {/* content */}
      </div>
    </div>
  );
};

export default LiveChat;
