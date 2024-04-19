import React, {useEffect} from 'react';
import './Sponsors.css'
import Sponsor1 from '../../../Assets/uefa.png'
import Sponsor2 from '../../../Assets/ipkoKosova.png'
import Sponsor3 from '../../../Assets/valaKosova.jpg'
import Sponsor4 from '../../../Assets/adidas.webp'
import Sponsor5 from '../../../Assets/nike.jpg'


import Aos from 'aos'
import 'aos/dist/aos.css'


const Sponsors = () => {

    useEffect(() => {
        Aos.init({easing: 'ease-out-back'})
    },[])

      
  return (
    <div className="sponsors-container">
      <h2 data-aos='slide-right'>Sponzorët tanë</h2>
      <div className="sponsors-list">
        <div className="sponsor-item" data-aos='flip-up' data-aos-duration='2000'>
          <img src={Sponsor1} alt="Sponsor 1" />
        </div>
        <div className="sponsor-item" data-aos='flip-up' data-aos-duration='3000'>
          <img src={Sponsor2} alt="Sponsor 2" />
        </div>
        <div className="sponsor-item" data-aos='flip-up' data-aos-duration='4000'>
          <img src={Sponsor3} alt="Sponsor 3" />
        </div>
        <div className="sponsor-item" data-aos='flip-up' data-aos-duration='5000'>
          <img src={Sponsor4} alt="Sponsor 4" />
        </div>
        <div className="sponsor-item" data-aos='flip-up' data-aos-duration='6000'>
          <img src={Sponsor5} alt="Sponsor 5" />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
