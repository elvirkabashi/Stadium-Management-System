import React, {useEffect} from 'react'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import { Link } from "react-router-dom";

//import the images 
import autobus from './images/autobus.jpg'
import stadium from './images/pjese-stadium.jpeg'
import fansat from './images/fansat.jpg'
import resto from './images/resto.jpg'
import dardanet from './images/dardanet.jpg'
import virtualTour from './images/virtualTour.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'


//array named Data
const Data1 = [
    
  {
    id:1,
    imgSrc:autobus,
    destTitle:'Autobusët Urban',
    description: 'Për të bërë udhëtimin këtu më të lehtë.'
  },
]
const Data2 = [
  {
    id:2,
    imgSrc:stadium,
    destTitle:'Arritja Këtu',
    description: 'Stadiumi është më afër se sa mendoni.'
    
  },
]

// const Data3 = [

//   {
//     id:3,
//     imgSrc:fansat,
//     destTitle:'Harta e Stadiumit',
//     description: 'Planifikoni udhëtimin tuaj për ta bërë atë sa më të thjeshtë.'
//   },


// ]
const Data4 = [
    
    {
      id:1,
      imgSrc:resto,
      destTitle:'Objektet e Stadiumit',
      description: 'Shërbimet dhe objektet për ta bërë vizitën tuaj më të mirë.'
    },
]
const Data5 = [
    {
      id:2,
      imgSrc:dardanet,
      destTitle:'Qasje për personat me aftësi të kufizuara',
      description: 'Duke e bërë më të lehtë për të gjithë të lëvizin.'
    },
  
  ]

  const Data6 = [
    {
        id:1,
        destTitle:'Pyetje shtesë?',
        description: 'Për çdo informacion shtesë, ju lutemi mos ngurroni të na kontaktoni këtu.'
      },
  ]

  const Data7 = [
    {
        id:4,
        imgSrc:virtualTour,
        destTitle:'Virtual Tour',
        description: 'Hapni derën drejt emocionit të futbollit dhe eksploroni stadiumin në një përvojë virtuale të pabesueshme !'
      },
  ]

const Tours = () => {
  
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])



  return (
<>

<div class="events">
          <h2 data-aos='fade-right'>PLANIFIKO VIZITEN</h2>
        </div>
    <section className='main container section'>

      <div className="secTitle">
        <h3 data-aos="fade-right"  className="title">
          BEFORE YOU TRAVEL
        </h3>
      </div>

      <div className="secContent grid">
        
        {
          Data1.map(({id, imgSrc, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/autobuset">
                          Kliko Ketu  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }
        {
          Data2.map(({id, imgSrc, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/arritja-ketu">
                          Kliko Ketu  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }
       {
          Data6.map(({id, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/contact">
                          Shko te Kontakti  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }
      </div>
    </section>
    <section className='main container section'>

      <div className="secTitle">
        <h3 data-aos="fade-right"  className="title">
          AT THE STADIUM 
        </h3>
      </div>

      <div id="karta_kontaktit " className="secContent grid">
        
        {
          Data4.map(({id, imgSrc, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/objektet">
                          Kliko Ketu  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }
{
          Data5.map(({id, imgSrc, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/disability">
                          Kliko Ketu  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }
        {
          Data7.map(({id, imgSrc, destTitle, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/virtualTour">
                          Kliko Ketu  ► 
                  </Link>
                    
                  </button>
                </div>
              </div>
            )
            
          })
        }

      </div>
    </section>
    </>
  )
}

export default Tours