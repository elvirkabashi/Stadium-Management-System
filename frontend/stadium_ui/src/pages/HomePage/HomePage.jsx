import '../../App.css'
import Home from '../Home/Home';
import ShortcutMain from '../HomePage/ShortcutMain/ShortcutMain';
import Homeslider from '../Slider/homeslider/slider';
import Testimonials from '../Testimonials/Testimonials';
import Map from './Map/Map';


const HomePage = () => {
  return (
    <>
    <Homeslider />
    <ShortcutMain />
    <Testimonials />
    <Home />
    <Map />
    </>
  )
}

export default HomePage