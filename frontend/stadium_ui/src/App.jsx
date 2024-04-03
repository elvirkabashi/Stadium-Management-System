import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from './components/Sidebar';

const App = () => {
                              //provo true ose false
  const [isAdmin,setIsAdmin] = useState(false)//Nese admini eshte true kan me u shfaq Sidebari dhe Routes per adminin 
                                            //ne te kunderten ka mu shfaq pjesa e userit

                                            //BrowserRouter per user te tjesht kan mu caktu te app.jsx 
                                            //kurse per pjesen e adminit BrowserRouter jan te file Sidebar.jsx

  return (
    <>
    {isAdmin ? (
      <Sidebar /> 
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    )}
  </>
  )
}

export default App