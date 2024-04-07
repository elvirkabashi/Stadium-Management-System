import '../../App.css'
import Home from '../Home/Home';
import ShortcutMain from '../HomePage/ShortcutMain/ShortcutMain';
import Map from './Map/Map';


const HomePage = () => {
  return (
    <>
    <ShortcutMain />
    <Home />
    <Map />
    </>
  )
}

export default HomePage