import React, { useState } from 'react';
import '../../../App.css';
import Home from './components/Home';
import ShortcutMain from './ShortcutMain/ShortcutMain';
import Programs from '../Programs/Programs';
import Homeslider from './homeslider/slider';
import Testimonials from './Testimonials/Testimonials';
import Map from './Map/Map';
import LiveChat from '../Chat/LiveChatWindow';
import './HomePage.css';

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Homeslider />
      <ShortcutMain />
      <Testimonials />
      <Programs />
      <Home />
      <Map />
      <LiveChat isOpen={isChatOpen} handleClose={toggleChat} />
      <button className="live-chat-button" onClick={toggleChat}>
        Live Chat
      </button>
    </>
  );
};

export default HomePage;
