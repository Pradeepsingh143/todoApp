import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {logout} from '../helper/index'
import userContext from '../context/userContext'



function Profile() {
  const {userDetails, getAccountDetails} = useContext(userContext)
  const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
      await logout()
      getAccountDetails()
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }
console.log(userDetails ? userDetails.$id : '');
  return (
    <>
    {userDetails ? (
    <>
    <h1>hello {userDetails.name}</h1>
    <button onClick={handleLogout}>logut</button>
    </>):(
    <> 
    <h2>need to login first</h2>
    </>)}
    </>
  )
}

export default Profile