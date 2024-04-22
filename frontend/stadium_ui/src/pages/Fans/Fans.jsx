import React, {useEffect} from 'react'

import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import Footer from '../Footer/Footer'
import { Link } from "react-router-dom";

//import the images 
import KosovoStandard from '../../Assets/KosovoStandard.jpg'
import KosovoPremium from '../../Assets/KosovoPremium.jpg'
import KosovoJunior from '../../Assets/KosovoJunior.jpg'
import './Fans.css';

import Aos from 'aos'
import 'aos/dist/aos.css'

//array named Data
const Data = [
    
  {
    id:1,
    imgSrc:KosovoPremium,
    title:'Kosovo Premium Fan',
    titleDescription: 'Actual Premium Kosovar membership card.',
    priceDescription: 'Only for',
    price: '35€',
    description: '15% discount at our Offical Online Shop, Advance Ticket Purchase, All of the benefits of the other plans.'
  },

  {
    id:2,
    imgSrc:KosovoStandard,
    title:'Kosovo Standard Fan',
    titleDescription: 'Actual Kosovar digital card.',
    priceDescription: 'Free',
    price: '0€',
    description: '5% discount on your first purchase on the Official Online Store, Contests and giveaways.'
  },

  {
    id:3,
    imgSrc:KosovoJunior,
    title:'Kosova Junior Fan',
    titleDescription: 'Actual Junior Kosovar membership card.',
    priceDescription: 'Only for',
    price: '20€',
    description: 'Advance Ticket Purchase, Yearly surprise gift.'
  },

]



const Fans = () => {
  
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])



  return (
<>
<div class="events">
          <h2 data-aos='fade-right'>FANS</h2>
        </div>
    <section className='new-main container section'>

      <div className="new-secTitle">
        <h3 data-aos="fade-right"  className="title">
          BASHKOHU ME KOMBETAREN
        </h3>
      </div>
      <div className="new-secContent grid">
        
        {
          Data.map(({id, imgSrc, title, titleDescription, priceDescription, price, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={title} />
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
                      <span>{price}</span>
                    </div>
 
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/login">
                    BASHKOHU TANI <HiOutlineClipboardCheck className='icon' />
                  </Link>
                    {/*<HiOutlineClipboardCheck className='icon' /> */}
                  </button>
                </div>
              </div>
            )
            
          })
        }

      </div>
    
    </section>
    <Footer/>
    </>
  )
}

export default Fans