import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserState from './context/userState'



ReactDOM.createRoot(document.getElementById('root')).render(
  <UserState>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserState>
)
