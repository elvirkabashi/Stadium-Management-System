import React, { useState } from 'react'; 
import './StadiumiStyle.css'
import { FaSearchLocation } from 'react-icons/fa';
import { FaRegAddressBook } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import myImage1 from "./kos-his.jpg";
import myImage2 from "./kos-his2.jpg";

import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
const Stadiumi = () => {
    return(
        <>
        <div class="hero">
		      <div class="hero-inner">
			      <h1>KOSOVO STADIUM</h1>
			      <p>Një vendtakim i kampionëve dhe histori e ndeshjeve të përjetshme në Prishtinë</p>
			      <Link to="/tiketat" className='tiketButon'>
              BLEJ TIKETA
            </Link>
		      </div>
        </div>
      <Footer />
        </>

    )
}


export default Stadiumi
