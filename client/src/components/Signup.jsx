import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../appwrite/AppWrite.config'
import { ID } from "appwrite";
import axios from 'axios'
import userContext from '../context/userContext'


function Signup() {
  const {Base_url} = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState({ message: '', error: false })
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })


  const signUpUser = async (e) => {
    e.preventDefault()
    try {
      const appWriteUser = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      const UserData = {
        name: appWriteUser.name,
        email: appWriteUser.email,
        appwriteId: appWriteUser.$id,
      }

      await axios.post(`${Base_url}/api/createUser`, UserData)
      navigate("/") //success

    } catch (error) {
      setError({ message: error.message, error: true })
    }
  }

  return (
    <>
      <section style={{ height: '80vh', width: '40%' }} className='container d-flex flex-column justify-content-center'>
        <div>
          <h2 className='mb-4'>SignUp Form</h2>
          <form className='d-flex flex-column gap-3' method='POST'>
            <div>
              <input type="text" placeholder='Enter your name' className="form-control p-2" id="name" aria-describedby="Name"
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value
                  })
                }} />
            </div>
            <div>
              <input type="email" placeholder='Enter your email' className="form-control p-2" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div>
              <input type="password" placeholder='Enter password' className="form-control p-2" id="exampleInputPassword1"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value
                  })
                }}
              />
            </div>
            <button type="submit" onClick={signUpUser} className="btn btn-primary">Register</button>
            {error.error ? error.message : ''}
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup