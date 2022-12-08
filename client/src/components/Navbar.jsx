import React, {useContext} from 'react'
import logo from '../assets/react.svg'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../helper'
import userContext from '../context/userContext'


const Navbar = () => {
  const {userDetails, getAccountDetails} = useContext(userContext)
   const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout()
      sessionStorage.clear()
      getAccountDetails()
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <header className="border-bottom p-2">
        <div className="d-flex container justify-content-between">
          <div className="logo"><Link to={'/home'}><img src={logo} alt="logo" /></Link></div>
          <div className='user'>
            <div className="btn-group">
              <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-regular fa-user" style={{ fontSize: "14px" }}></i> Profile
              </button>
              <ul className="dropdown-menu">
                {userDetails ? 
                (
                  <>
                  <h6 className='text-decoration-none dropdown-item'>Hello {userDetails.name}</h6>
                  <Link to='/profile' className='text-decoration-none dropdown-item'><i className="fa-regular fa-registered"></i> Profile</Link>
                  <li><hr className="dropdown-divider" /></li>
                  <button className='dropdown-item' onClick={handleLogout}>Logout</button>
                  </>
                  ) : (
                   <>
                    <Link to='/' className='text-decoration-none dropdown-item'><i className="fa-solid fa-arrow-right-to-bracket"></i> Login</Link>
                    <Link to='/signup' className='text-decoration-none dropdown-item'><i className="fa-regular fa-registered"></i> Register</Link>                    </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar


