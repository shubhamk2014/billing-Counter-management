import React from 'react'
import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';
import { setUserToken } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { getToken, storeToken } from "./services/LocalStorageService";

export default function Protected() {

  let {access_token } = getToken()
  const dispatch = useDispatch();

  console.log(access_token)

  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])

  if (access_token) {
    return <Navigate to='/' />
  }
  return (
    <Outlet />
  )
}
