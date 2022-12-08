import React from 'react'
import { account } from '../appwrite/AppWrite.config'

export const logout = () =>{
   return account.deleteSession("current");
}

export const getAccountData = ()=>{
   return account.get();
}