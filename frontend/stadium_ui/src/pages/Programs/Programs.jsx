import React, {useEffect} from 'react'
import './Programs.css'
import {AiOutlineArrowRight} from 'react-icons/ai'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Programs = () => {

    useEffect(() => {
        Aos.init({duration: 2000, easing: 'ease-in-quint'})
    },[])


  return (
    <div className="Programs" id="programs">
        {/* header */}
        <div className="programs-header" data-aos='fade-right'>
            <span className='stroke-text'>Plan </span>
            <span id='textColor'>Your</span>
            <span className='stroke-text'>Visit</span>
        </div>

    </div>
  )
}

export default Programs