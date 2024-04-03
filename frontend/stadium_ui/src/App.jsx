import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Sidebar from './Components/Sidebar';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Sidebar />} />
        </Routes>
  </BrowserRouter>
  )
}

export default App