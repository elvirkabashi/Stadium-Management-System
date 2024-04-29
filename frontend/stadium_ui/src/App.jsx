import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/User/HomePage/HomePage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar/Navbar'
import Contact from './pages/User/Contact/Contact';
import Eventet from './pages/User/Eventet/Eventet';
import Tiketat from './pages/User/Tiketat/Tiketat'
import Stadiumi from './pages/User/Stadiumi/Stadiumi';
import LiveScore from './pages/User/Livescore/LiveScore';
import Fans from './pages/User/Fans/Fans';
import Footer from './components/Footer/Footer';


const App = () => {
                              //provo true ose false
  const [isAdmin,] = useState(true)//Nese admini eshte true kan me u shfaq Sidebari dhe Routes per adminin 
                                            //ne te kunderten ka mu shfaq pjesa e userit

                                            //BrowserRouter per user te tjesht kan mu caktu te app.jsx 
                                            //kurse per pjesen e adminit BrowserRouter jan te file Sidebar.jsx

  return (
    <>
    {isAdmin ? (
      <Sidebar /> 
    ) : (
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stadiumi' element={<Stadiumi />} />
          <Route path='/fans' element={<Fans />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/tiketat' element={<Tiketat />} />
          <Route path='/livescore' element={<LiveScore />} />
          <Route path='*' element={<Eventet/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    )}
  </>
  )
}

export default App