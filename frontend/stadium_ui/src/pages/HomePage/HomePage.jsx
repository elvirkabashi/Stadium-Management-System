import '../../App.css'
import Home from '../Home/Home';
import ShortcutMain from '../HomePage/ShortcutMain/ShortcutMain';
import Homeslider from '../Slider/homeslider/slider';
import Map from './Map/Map';


const HomePage = () => {
  return (
    <>
    <Homeslider />
    <ShortcutMain />
    <Home />
    <Map />
    </>
  )
}

export default HomePage