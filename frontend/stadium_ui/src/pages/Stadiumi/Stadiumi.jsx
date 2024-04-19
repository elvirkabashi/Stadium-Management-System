import React, { useState } from 'react'; 
import './StadiumiStyle.css';
import { FaSearchLocation, FaRegAddressBook, FaLaptop } from 'react-icons/fa';
import myImage1 from "./kos-his.jpg";
import myImage2 from "./kos-his2.jpg";

import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";

const Stadiumi = () => {
  // State to manage opening hours display
  const [showOpeningHours, setShowOpeningHours] = useState(false);

  // Function to toggle opening hours display
  const toggleOpeningHours = () => {
    setShowOpeningHours(!showOpeningHours);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <h1>KOSOVO STADIUM</h1>
          <p>Një vendtakim i kampionëve dhe histori e ndeshjeve të përjetshme në Prishtinë</p>
          <Link to="/tiketat" className='tiketButon'>
            BLEJ TIKETA
          </Link>
        </div>
      </div>
      <div className="stadium-info">
        <div className="stadium-description">
          <h2>About Kosovo Stadium</h2>
          <p>
            Kosovo Stadium, located in the heart of Prishtina, is a modern sports arena known for hosting thrilling championship matches and legendary sporting events. With a seating capacity of over 30,000 spectators, it stands as a testament to Kosovo's passion for sports.
          </p>
          <p>
            The stadium boasts state-of-the-art facilities, including cutting-edge technology and premium amenities, ensuring an unforgettable experience for both athletes and fans alike.
          </p>
        </div>
        <div className="stadium-services">
          <h2>Services</h2>
          <ul>
            <li><FaSearchLocation /> Spectacular view from every seat</li>
            <li><FaRegAddressBook /> VIP lounges and luxury boxes</li>
            <li><FaLaptop /> High-speed Wi-Fi throughout the stadium</li>
          </ul>
        </div>
      </div>
      <div className="stadium-gallery">
        <h2>Photo Gallery</h2>
        <div className="gallery-images">
          <img src={myImage1} alt="Kosovo Stadium" />
          <img src={myImage2} alt="Kosovo Stadium" />
          <img src={myImage1} alt="Kosovo Stadium" />
          <img src={myImage2} alt="Kosovo Stadium" />
          <img src={myImage1} alt="Kosovo Stadium" />
          <img src={myImage2} alt="Kosovo Stadium" />
        </div>
      </div>
      <div className="stadium-opening-hours">
        <h2>Opening Hours</h2>
        <button style={{
          backgroundColor: '#0077cc',
          color: '#fff',
          border: 'none',
          padding: '12px 24px', // Adjust padding for better button size
          marginBottom:'40px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease, transform 0.2s ease', // Add transition for smoother animation
          fontSize: '1.2rem', // Adjust font size
          textTransform: 'uppercase', // Convert text to uppercase
          letterSpacing: '0.05em' // Add letter spacing
        }} onClick={toggleOpeningHours}>
          {showOpeningHours ? 'Hide Opening Hours' : 'Show Opening Hours'}
        </button>

        {showOpeningHours && (
          <div className="opening-hours-details">
            <p>Monday - Friday: 9:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            <p>Holidays: Closed</p>
          </div>
        )}
      </div>
      
      {/* <div className="events">
        <h2>Upcoming Events</h2>
        <div className="event-card">
          <img src="event-image.jpg" alt="Event" />
          <div className="event-details">
            <h3>Event Name</h3>
            <p>Date: January 1, 2025</p>
            <p>Time: 7:00 PM</p>
            <p>Location: Kosovo Stadium</p>
          </div>
        </div>
        
      </div> */}

      {/* <div className="player-profiles">
        <h2>Player Profiles</h2>
        <div className="profile-card">
          <img src="player-image.jpg" alt="Player" />
          <div className="profile-details">
            <h3>Granit Xhaka</h3>
            <p>Pozicioni: Mesfushore</p>
            <p>Goals Scored: 100</p>
            <p>Assists: 50</p>
          </div>
        </div>
        
      </div> */}


      <Footer />
    </>
  );
};

export default Stadiumi;
