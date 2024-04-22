import React, {useEffect}  from 'react';
import './Map.css';
import { Link } from 'react-router-dom';

import Aos from 'aos'
import 'aos/dist/aos.css'


const Map = () => {
    useEffect(() => {
        Aos.init({duration: 2100, easing:'ease-in-out-back'})
    },[])

      
return (
    <div className="map-container">
        <div className="map-info">
            <h1>LOKACIONI I STADIUMIT</h1>
            <p>Stadiumi Fadil Vokrri ndodhet në qendër të Prishtinës, kryeqyteti i Kosovës. 
                Lokacioni i tij saktë është në lagjen "Dardania", në afërsi të rrugës "Fehmi Agani". 
                Ky stadium modern dhe i pajisur me standarte ndërkombëtare ka një kapacitet prej 
                rreth 13,500 vendeve dhe është vendi ku luajnë ndeshjet kryesore ekipet kombëtare 
                dhe klube të futbollit të Kosovës. Ai është emëruar pas legjendës së futbollit të Kosovës, 
                Fadil Vokrrit, i cili kishte kontribuar në arritjen e shumë sukseseve për futbollin në Kosovë.</p>
                <button data-aos="fade-up-right" className='btn flex' style={{marginTop: '30px', marginLeft: 'auto', marginRight: '0'}}>
                    <Link to="/contact">
                        Shih kontaktin
                    </Link>
                </button>
        </div>
        <div className="map-iframe" data-aos='flip-right'>
            <iframe title="Google Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.928454076262!2d21.1544899753821!3d42.662871515918106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee398234689%3A0x1ecdd21bb52cbd0f!2zU3RhZGl1bSAiIPCdkIXwnZCA8J2Qg_CdkIjwnZCLIPCdkJXwnZCO8J2QivCdkJHwnZCR8J2QiCAiIFByaXN0aW5h!5e0!3m2!1sen!2s!4v1682011069333!5m2!1sen!2s"
            width="600"
            height="450"
            style={{border:"0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
)
}

export default Map;