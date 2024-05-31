import React, { useState } from 'react'; 

import './Autobuset.css';
import autobus from './images/autobus.jpg'

const Autobuset = () => {
    return(
    <>
    <div className="containerA">
        <div className="text-containerA">
            <header>TA BËJMË TË LEHTË RRUGËN DREJT STADIUMIT</header>
                <p>
                    Shikoni autobuset urban, referohuni tek linja numer 3 ose 4 per te arritur ne stadium. Shikoni oraret <a href="https://trafikurban-pr.com/orari-dhe-linjat">Trafiku Urban</a>
                </p>
        </div>
        <div className="image-containerA">
            <img src={autobus} alt="autobus.jpg"/>
        </div>
    </div>
    </>

    )
}


export default Autobuset
