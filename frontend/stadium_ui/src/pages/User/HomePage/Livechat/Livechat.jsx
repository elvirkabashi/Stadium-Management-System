import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import WaitingRoom from './waitingroom';
import ChatRoom from './ChatRoom';
import './Livechat.css'; // Import the custom CSS file

function Livechat() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // initiate connection
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:60311/chat")
        .configureLogging(LogLevel.Information)
        .build();

      // set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(conn);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="livechat-container">
      <main>
        <div className="livechat-header">
          <h1>Welcome to chat</h1>
        </div>
        { !conn 
          ? <WaitingRoom joinChatRoom={joinChatRoom} />
          : <ChatRoom messages={messages} sendMessage={sendMessage} />
        }
      </main>
    </div>
  );
}

export default Livechat;
