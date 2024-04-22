import {useEffect} from 'react'
import './Eventet.css'
import Main from './Main/Main'
import Sponsors from './Sponsors/Sponsors'


import Aos from 'aos'
import 'aos/dist/aos.css'

const Eventet = () => {
  useEffect(() => {
    Aos.init({duration: 2000})
  },[])

  return (
    <>
      <div className="events">
        <h2 data-aos='fade-right'>EVENTET</h2>
      </div>
    <Main />
    <Sponsors />
    </>
  )
}

export default Eventet
