import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from './components/Sidebar';

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