import '../../App.css'
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import ShortcutMain from '../HomePage/ShortcutMain/ShortcutMain';
import Programs from '../Programs/Programs';
import Homeslider from '../Slider/homeslider/slider';
import Testimonials from '../Testimonials/Testimonials';
import Map from './Map/Map';


const HomePage = () => {
  return (
    <>
    <Homeslider />
    <ShortcutMain />
    <Testimonials />
    <Programs />
    <Home />
    <Map />
    <Footer />
    </>
  )
}

export default HomePage