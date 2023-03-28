import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';


export default function Protected() {
    const { access_token } = useSelector(state => state.auth);
    if (!access_token) {
        return <Navigate to='/login' />
    }
  return (
    <Outlet/>
  )
}
