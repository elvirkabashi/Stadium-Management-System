import React from 'react';
import './LiveChatWindow.css';
import Livechat from '../HomePage/Livechat/Livechat'; // Import the Livechat component

const LiveChatWindow = ({ isOpen, handleClose }) => {
  return (
    <div className={`live-chat ${isOpen ? 'open' : ''}`}>
      <div className="live-chat-header">
        <h4>Live Chat</h4>
        <button onClick={handleClose}>Close</button>
      </div>
      <div className="live-chat-body">
        {isOpen && <Livechat />} {/* Render Livechat when the chat window is open */}
      </div>
    </div>
  );
};

export default LiveChatWindow;
