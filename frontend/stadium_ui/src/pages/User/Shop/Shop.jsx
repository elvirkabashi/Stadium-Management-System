import React, {useEffect} from 'react';
import axios from 'axios';
import { useState } from "react";
import './shop.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Zoom from 'react-image-zoom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


import img8 from '../../images/kosova1.jpg'
import img1 from '../../images/d9a6c41ab6ef92bd3e6c11d0df37b942.jpg'
import img2 from '../../images/RealMadrid_Official_Online_Store.avif'
import img3 from '../../images/download.jpeg'
import img4 from '../../images/galerie_bg.jpg'
import img5 from '../../images/kosovo-2021-2022-fourteen-kit-1.webp'
import img6 from '../../images/vedat-muriqi.jpg'
import img7 from '../../images/pod_home_535x.webp'
import backKit from '../../images/back-kit.jpg'
import alitiback from '../../images/aliti-back.webp'
import alitiboth from '../../images/aliti-both.webp'
import awaykitback from '../../images/away-kit-back.webp'
import awaykitfront from '../../images/away-kit-front.webp'
import bluzaback from '../../images/bluza-back.webp'
import bluzafront from '../../images/bluza-front.webp'
import celinaback from '../../images/celina-back.webp'
import celinaboth from '../../images/celina-both.webp'
import duksback from '../../images/duks-back.webp'
import duksfront from '../../images/duks-front.webp'
import duks2back from '../../images/duks2-back.webp'
import duks2front from '../../images/duks2-front.webp'
import trainers from '../../images/komplet-trainers.webp'
import muriqiback from '../../images/muriqi-back.webp'
import muriqiboth from '../../images/muriqi-both.webp'
import rashicaback from '../../images/rashica-back.webp'
import rashicaboth from '../../images/rashica-both.webp'
import frontkit from '../../images/style-front-kit.webp'
import whitekit from '../../images/style-front-white-kit.webp'
import vojvodaback from '../../images/vojvoda-back.webp'
import vojvodaboth from '../../images/vojvoda-both.webp'
import yourback from '../../images/your-back.webp'
import yourboth from '../../images/your-both.webp'












import ShopN from '../ShopNavbar/ShopN'
// import SecondN from '..//Navbar';
import ShopSecond from './ShopSecond'
// import Footer from '../Footer/Footer'

import Aos from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';




const Shop = () => {


  useEffect(() => {
    Aos.init({duration: 2000})
  },[])

    return (
        <>  
            {/* <SecondN/> */}
            <div className="events">
              <h2>SHOP</h2>
            </div>
            <div class="container">

                {/* <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="form span">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input" placeholder="Search anything..."/>
                        </div>
                    </div>
                </div> */}
            </div>

        <hr/>

        {/* <ShopN/> */}

        <hr />

      <div id="carouselExampleCaptions" class="slide container" data-ride="">
            <div className="carousel-inner">
                <div className="carousel-item active container-fluid" data-aos="flip-up">
                    <img src={img8} class="d-block" alt="..."/>
                        <div className="carousel-caption" data-aos="slide-right">
                            <h5>Vedat Muriqi</h5>
                            <p>Top goalscorer in LaLiga with Mallorca and also a topscorer in Kosova National Football Team</p>
                        </div>
                </div>
            </div>
        </div>
    <hr />

      

      
    <div class="container snap-scroll-container">
        <div class="row">
          <div class="col-12">
            <div class="overflow-auto vertical-scroll" style={{ whiteSpace: "nowrap"}}>
              <div class="d-inline-block mx-10 card card-style-1">
                <img class="snap-scroll-images" src={alitiboth} alt="Image 1"/>
                <div class="card-body">
                  <h5 class="card-title">Aliti Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style-2">
                <img class="snap-scroll-images" src={muriqiboth} alt="Image 2"/>
                <div class="card-body">
                  <h5 class="card-title">Muriqi Signed Home Kit</h5>
                  <p class="card-text">89.99$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style-3">
                <img class="snap-scroll-images" src={rashicaboth} alt="Image 3"/>
                <div class="card-body">
                  <h5 class="card-title">Rashica Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style-4">
                <img class="snap-scroll-images" src={celinaboth} alt="Image 4"/>
                <div class="card-body">
                  <h5 class="card-title">Celina Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style-5">
                <img class="snap-scroll-images" src={vojvodaboth} alt="Image 5"/>
                <div class="card-body">
                  <h5 class="card-title">Vojvoda Home Kit</h5>
                  <p class="card-text">50.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
              <div class="d-inline-block mx-10 card card-style-6">
                <img class="snap-scroll-images" src={yourboth} alt="Image 6"/>
                <div class="card-body">
                  <h5 class="card-title">Signed Training Shirt</h5>
                  <p class="card-text">75.00$</p>
                  <button className='btn btn-outline-light'>Buy now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-start header-div" data-aos="fade-up-right">
            <span class="diagonal-line header-kits">Kits</span> 
            <div className='header-lines'>
              <span className='header-lines'>//////////</span>
            </div>
          </div>
        </div>
      </div>


    <div className='container kits-container'>
      <div className='row justify-content-center'>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right">
        <img src={duks2front} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Kosova Training Hoodie 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right">
        <img src={duksfront} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Kosova Training Hoodie 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    </div>

    <div className='container kits-container'>
      <div className='row justify-content-center'>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={bluzafront} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Kosova Training Shirt 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-md-4 kits-card border-0 mb-20" data-aos="fade-right" data-aos-delay="8000">
        <img src={trainers} class="card-img-top" alt="..."/>
        <div class="card-body kits-card-body">
          <p class="card-title card-text">Kosova Training Kit 22/23</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    </div>



      <ShopSecond/>


      
      {/* <Footer/> */}
      </>
      

    )
}

export default Shop;