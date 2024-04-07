import React, {useEffect} from 'react'
import './home.css'
import video from '../../Assets/Kosovo-1min.mp4'
// import {GrLocation} from 'react-icons/gr'
// import {HiFilter} from 'react-icons/hi'
import {FiFacebook} from 'react-icons/fi'
import {AiOutlineInstagram} from 'react-icons/ai'
import {FaTripadvisor} from 'react-icons/fa'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'

import Aos from 'aos'
import 'aos/dist/aos.css'



const Home = () => {
  //create a react hook to add scroll animation
  useEffect(() => {
    Aos.init({duration: 4000})
  },[])



  return (
    <section className="home">
      <div className="overlay"></div>
        <video src={video} muted autoPlay loop type="Kosovo-1min/mp4" data-aos='zoom-in' ></video>

        <div className="homeContent container">
          <div className="textDiv">

            <span data-aos="fade-up" className="smallText">
              STADIUM
            </span>

            <h1 data-aos="fade-up"  className="homeTitle"> 
              KOSOVA
            </h1>

          </div>

          <div data-aos="fade-up" className="homeFooterIcons flex">
            <div className="rightIcons">
              <FiFacebook className="icon" />
              <AiOutlineInstagram className="icon" />
              <FaTripadvisor className="icon" />
            </div>

            <div className="leftIcons">
              <BsListTask className="icon" />
              <TbApps className="icon" />

            </div>
          </div>
        </div>
      
    </section>
  )
}

export default Home