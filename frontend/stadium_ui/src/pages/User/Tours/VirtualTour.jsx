import React from 'react';
import "./VirtualTour.css"


const VirtualTour = () => {
    return (
        <>
        <div className='virtual'>
        <h1 className='titulliVirtual'>Virtual Tour</h1>
        <p className='paragrafiVirtual'>Hapni derën drejt emocionit të futbollit dhe eksploroni stadiumin në një përvojë virtuale të pabesueshme</p>
          <div id="virtual-tour">
          <iframe width="100%" height="640" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/collection/7FWFX?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"></iframe>
          </div>
        </div>
        </>
    );
};
    
export default VirtualTour;
    