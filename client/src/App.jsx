import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Game from './pages/Game'
const App = () => {
  return (
   <Routes>
    <Route element={<Home/>} path='/' />
    <Route element={<Game/>} path='/game' />

   </Routes>
  )
}

export default App