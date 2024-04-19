
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import Swiper core and required modules
import { Navigation, Autoplay} from 'swiper/modules';
// import {StaticImage} from "gatsby-plugin-image"
import kosovabanner from './images/kosovabanner.png'
import ffk from './images/ffk.png'
import firstmatch from './images/firstmatch.png'
import kstadium from './images/kstadium.png'
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
import '../../../tail.css'
import './homeslider.css'

export default function Homeslider(){
    return (
    <div>
        <Swiper
        className='relative'
        spaceBetween={50}
        slidesPerView={1}
        navigation = {{
            nextEl:".button-next-slide", 
            prevEl:".button-prev-slide", 
        }}
        autoplay={{delay:1400}}
        modules={[Navigation, Autoplay]}
        >
        <SwiperSlide>
            <div className="relative">
                <img src={ffk} alt="" className="slide-img"/>
                <div className="slide-content">
                    <h3 className="slide-subtitle">DARDANET</h3>
                    <h3 className="slide-title">KOSOVA STADIUM</h3>
                    <p className="slide-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nam voluptatum, error alias magnam delectus, incidunt, corporis suscipit hic minima nisi itaque quis qui harum praesentium fugit impedit beatae sint.</p>
                    <button className="slide-button">LEXO ME SHUME</button>
                </div>
            </div>
        </SwiperSlide>


        <SwiperSlide>
            <div className="relative">
                <img src={kstadium} alt="" className="slide-img"/>
                <div className="slide-content" style={{color:'white'}}>
                    <h3 className="slide-subtitle">Stadiumi </h3>
                    <h3 className="slide-title">KOSOVA</h3>
                    <p className="slide-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nam voluptatum, error alias magnam delectus, incidunt, corporis suscipit hic minima nisi itaque quis qui harum praesentium fugit impedit beatae sint.</p>
                    <button className="slide-button">LEXO ME SHUME</button>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="relative">
                <img src={kosovabanner} alt="" className="slide-img"/>
                <div className="slide-content" style={{color:'white'}}>
                    <h3 className="slide-subtitle">Vikendi po sjell lojen me te mire</h3>
                    <h2 className="slide-title">Kosova vs Romania</h2>
                    <button className="slide-button">LEXO ME SHUME</button>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className="relative">
                <img src={firstmatch} alt="" className="slide-img"/>
                <div className="slide-content" style={{color:'black'}} id='slideBox'>
                    <h3 className="slide-subtitle">Ndeshja e pare historike</h3>
                    <h2 className="slide-title">Kosova vs Haiti</h2>
                    <button className="slide-button" id='button' >LEXO ME SHUME</button>
                </div>
            </div>
        </SwiperSlide>
        
        <div className="button-slide button-prev-slide -hover:left-0">
            <HiOutlineArrowNarrowLeft/>
        </div>
        <div className="button-slide button-next-slide -hover:right-0">
            <HiOutlineArrowNarrowRight/>
        </div>


        </Swiper>
    </div>
    )
}



