import React, { useState, useContext } from 'react'
import { account } from '../appwrite/AppWrite.config'
import { useNavigate } from 'react-router-dom'
import { getAccountData } from '../helper/index'
import userContext from '../context/userContext'

function Login() {
  const { setUserDetails, getAccountDetails} = useContext(userContext)
  const navigate = useNavigate();
  const [error, setError] = useState({ message: '', error: false })
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      await account.createEmailSession(
        user.email,
        user.password
      );
      const userDetails = await getAccountData();
      const data = sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      setUserDetails(data)
      getAccountDetails()
      navigate('/home')
    } catch (error) {
      setError({ message: error.message, error: true })
      console.log(error);
    }
  }

  return (
    <>
      <section style={{ height: '80vh', width: '40%' }} className='container d-flex flex-column justify-content-center'>
        <div>
          <h2 className='mb-4'>Login Form</h2>
          <form className='d-flex flex-column gap-3'>
            <div>
              <input type="email" placeholder='Enter your email' className="form-control p-2" id="InputEmail" aria-describedby="email"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div>
              <input type="password" placeholder='Enter password' className="form-control p-2" id="InputPassword"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value
                  })
                }} />
            </div>
            <button type="submit" className="btn btn-primary"
              onClick={loginUser}
            >Login</button>
            {error ? error.message : 'Login successfully'}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login