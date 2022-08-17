import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'


const PrivateRoute = () => {

  const {isSignedIn, checkingStatus} = useAuthStatus();

  if(checkingStatus){
    return <Spinner/>
  }

  return isSignedIn ? < Outlet/> : <Navigate to= '/sign-in'/>
}

export default PrivateRoute