import React, {useEffect} from 'react'
import './ShortcutMain.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'

import { Link } from "react-router-dom";

//import the images 
import Kos1 from '../../../Assets/kosova1.jpg'
import HarryStyles from '../../../Assets/harry_styles.jpg'
import Robin_Krasniqi from '../../../Assets/RobinKrasniqi.jpg'

import Aos from 'aos'
import 'aos/dist/aos.css'

//array named Data
const Data = [
  {
    id:1,
    imgSrc:Kos1,
    destTitle:'Kosova vs Romania',
    location: 'Kosove',
    grade: '16 Qershor 2023',
    fees: '8:45PM',
    description: 'Lorem ipsum dolor sit'
  },

  {
    id:2,
    imgSrc:HarryStyles,
    destTitle:'Harry styles',
    location: 'Kosova',
    grade: '20 Gusht 2023',
    fees: '6:45PM',
    description: 'Love on tour',
    type: 'Concert'
  },

  {
    id:3,
    imgSrc: Robin_Krasniqi,
    destTitle:'Robin Krasniqi vs Dominic Boesel',
    location: 'Kosova',
    grade: '9 Tetor 2023',
    fees: '6:45PM',
    description: 'IBO World Light Heavyweight',
    type: 'Box'
  },
]



const ShortcutMain = () => {
  
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])



  return (
    <section className='mainShortcut container section'>

      <div className="secTitle">
        <h3 data-aos="fade-right"  className="title">
          NDESHJET E ARDHSHME
        </h3>
      </div>

      <div className="secContent grid">
        
        {
          Data.map(({id, imgSrc, destTitle, location, grade, fees, description})=>{
            return( 
              <div key={id} className="singleDestination" data-aos="fade-up">
                
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className='icon' />
                    <span className="name">{location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>{grade}</span>
                    </div>
                    <div className="price">
                      <span>{fees}</span>
                    </div>
 
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className='btn flex'>
                  <Link to="/tiketat">
                    BLEJ TIKETEN <HiOutlineClipboardCheck className='icon' />
                  </Link>
                    {/*<HiOutlineClipboardCheck className='icon' /> */}
                  </button>
                </div>
              </div>
            )
          })
        }

      </div>
        <button data-aos="fade-up" className='btn flex' style={{marginTop: '30px', marginLeft: 'auto', marginRight: '0'}}>
            <Link to="/eventet">
                Kliko per te lexuar me shume
            </Link>
        </button>
    </section>
    
  )
}

export default ShortcutMain