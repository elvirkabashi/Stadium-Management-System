import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/User/HomePage/HomePage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar/Navbar'
import Contact from './pages/User/Contact/Contact';
import Tiketat from './pages/User/Tiketat/Tiketat'
import Stadiumi from './pages/User/Stadiumi/Stadiumi';
import LiveScore from './pages/User/Livescore/LiveScore';
import Tours from './pages/User/Tours/Tours';
import Fans from './pages/User/Fans/Fans';
import Footer from './components/Footer/Footer';
import Shop from './pages/User/Shop/Shop';
import Eventet from './pages/User/Eventet/Eventet';
import Login from './pages/Auth/Login/Login';
import { getAuthToken } from './pages/utils/Cookies';
import NotFound from './components/NotFound/NotFound';

const App = () => {

  const [isAdmin,setAdmin] = useState(null) 

  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      // console.log(decodedToken);
      if (decodedToken.Role === 'Admin') {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(null);
    }
  }, []);
  
  return (
    <>
    {isAdmin ? (
      <Sidebar /> 
    ) : (
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/stadiumi' element={<Stadiumi />} />
          <Route path='/tours' element={<Tours/>}/>
          <Route path='/fans' element={<Fans />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/tiketat' element={<Tiketat />} />
          <Route path='/livescore' element={<LiveScore />} />
          <Route path='*' element={<NotFound/>} />
          <Route path='/eventet' element={<Eventet/>} />
          <Route path='/shop' element={<Shop/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    )}
  </>
  )
}

export default App