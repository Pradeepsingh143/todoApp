import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'


const App = () => {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App