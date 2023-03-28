
import React, { useState,useEffect } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { useLoginUserMutation } from "../../services/userAuthApi";
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from "../../services/LocalStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";


export default function Login() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [server_error, setServer_error] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;

  const validateEmail = () => {
    if (email) {
      
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
    else{
      setEmailError('This field may not be empty !!!')
    }
  };

  const validatePassword = () => {
    if (password) {
      
      if (!passwordRegex.test(password)) {
        setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.');
      } else {
        setPasswordError('');
      }
    }
    else{
      setPasswordError('This field may not be empty !!!')
    }
  };



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && password) {
      
      const actualData = {
        email: email,
        password: password,
      }
      const res = await loginUser(actualData)
      // console.log(res)
      if (res.error) {
        // console.log(res.error.data.errors)
        setServer_error(res.error.data.errors)
      }
      if (res.data) {
        // console.log(res.data)
        storeToken(res.data.token)
        let {access_token} = getToken()
        dispatch(setUserToken({access_token:access_token}))
        navigate('/home')
  
      }
    }
    else{
      setEmailError('This field may not be empty !!!')
      setPasswordError('This field may not be empty !!!')
    }

  };

  let {access_token } = getToken()
//   useEffect(() => {
//     dispatch(setUserToken({access_token: access_token}))
// }, [access_token,dispatch])

  return (
    <>
      <div style={{ height: '89vh', display: 'flex',alignItems: 'center' ,justifyContent : 'center'}}>

      
      <Card className='shadow-lg p-3 mb-5 rounded' style={{ backgroundColor: '#F0F0F0', width: '35%', height: '55%', textAlign: 'center' }}>

        <h1>Login Here</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onKeyUp={validateEmail}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyUp={validatePassword}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
            {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="mt-2" style={{ borderRadius: '12px' }} variant="secondary" type="submit" disabled={!!emailError || !!passwordError}>
            Login
          </Button>
        </Form>
        {server_error.non_field_errors? <span style={{fontSize : '12px', color : 'red',marginTop: '5%'}}>{server_error.non_field_errors[0]}</span>:''}
        <a href="/reg">New here Register Now</a>
      </Card>
      </div>
    </>
  );
}