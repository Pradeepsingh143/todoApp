import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import axios from 'axios';

axios.defaults.baseURL = "https://todoapp-production-419a.up.railway.app"
axios.defaults.timeout = 8000;

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