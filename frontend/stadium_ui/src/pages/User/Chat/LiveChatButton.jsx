// src/components/LiveChatButton.js
import React from 'react';

const LiveChatButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      Live Chat
    </button>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LiveChatButton;
