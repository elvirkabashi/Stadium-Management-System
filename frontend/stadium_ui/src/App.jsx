import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar/Navbar'
import Contact from './pages/Contact/Contact';
import NotFound from './components/NotFound/NotFound';

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
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    )}
  </>
  )
}

export default App