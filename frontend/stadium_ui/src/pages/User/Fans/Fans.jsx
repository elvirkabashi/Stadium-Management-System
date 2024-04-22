import React, { useEffect, useState } from 'react';
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

// Import the images
import KosovoStandard from '../../../Assets/KosovoStandard.jpg';
import KosovoPremium from '../../../Assets/KosovoPremium.jpg';
import KosovoJunior from '../../../Assets/KosovoJunior.jpg';
import './Fans.css';

const Fans = () => {
  const [fansData, setFansData] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5163/api/Fans');
      setFansData(response.data);
    } catch (error) {
      console.error('Error fetching fans:', error);
    }
  };

  return (
    <>
      <div class="events">
        <h2 data-aos="fade-right">FANS</h2>
      </div>
      <section className="new-main container section">
        <div className="new-secTitle">
          <h3 data-aos="fade-right" className="title">
            BASHKOHU ME KOMBETAREN
          </h3>
        </div>
        <div className="new-secContent grid">
          {fansData.map(({ id, imageUrl, title, titleDescription, priceDescription, price, description, }) => {
            return (
              <div key={id} className="singleDestination" data-aos="fade-up">
                <div className="imageDiv">
                  <img src={imageUrl} alt={title} />
                </div>
                <div className="cardInfo">
                  <h4 className="destTitle">{title}</h4>
                  <span className="continent flex">
                    <span className="name">{titleDescription}</span>
                  </span>
                  <div className="fees flex">
                    <div className="grade">
                      <span>{priceDescription}</span>
                    </div>
                    <div className="price">
                      <span>{price} €</span>
                    </div>
                  </div>
                  <div className="desc">
                    <p>{description}</p>
                  </div>
                  <button className="btn flex">
                    <Link to="/login">
                      BASHKOHU TANI <HiOutlineClipboardCheck className="icon" />
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Fans;
