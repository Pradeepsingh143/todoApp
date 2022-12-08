import React, { useEffect, useState } from "react";
import userContext from "./userContext";

const UserState = ({ children }) => {
  const [userDetails, setUserDetails] = useState(undefined)

  const getAccountDetails = async () => {
    try {
      const userObj = await JSON.parse(sessionStorage.getItem('userDetails'))
      setUserDetails(userObj)
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(() => {
    getAccountDetails()
  }, [])


  const Base_url = 'http://localhost:4000';


  return (
    <userContext.Provider
      value={{
        userDetails,
        setUserDetails,
        getAccountDetails,
        Base_url,
      }}>
      {children}
    </userContext.Provider>
  )
}

export default UserState