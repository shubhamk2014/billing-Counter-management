import { useEffect, useState } from 'react';
import {TbLogout} from 'react-icons/tb'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { unSetUserToken } from '../features/authSlice';
import { setUserInfo } from '../features/userSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = getToken()
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)

  const [userData, setUserData] = useState({
    firstName : "",
    lastName : ""
  })

  useEffect(() =>{

    if (data && isSuccess){
      setUserData({
        firstName:data.firstName,
        lastName:data.lastName
      })
    }
  }, [data,isSuccess])

  useEffect(() =>{

    if (data && isSuccess){
      dispatch(setUserInfo({
        firstName:data.firstName,
        lastName:data.lastName
      }))
    }
  }, [data,isSuccess,dispatch])


  // console.log(data)
  const handleLogOut = (e) =>{
    dispatch(unSetUserToken({access_token: null}))
    removeToken()
    navigate('/login')
  }
  return (
    <>
    <div style={{display : 'flex', justifyContent : 'space-between',border: '2px solid black',marginTop: '2px', background:'#E8E8E8'}}>

        <h4 style={{paddingLeft: '20px'}}>Welcome {userData.firstName}</h4>
        <h4>{new Date().toLocaleDateString()}  <TbLogout onClick={handleLogOut} style={{margin: '0px 25px',color: 'red'}}/></h4>
        
    </div>
    
    </>
  )
}
