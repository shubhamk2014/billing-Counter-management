import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../../services/LocalStorageService';

export default function LogReg() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [validated, setValidated] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [server_error, setServer_error] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]{8,}$/;

    const validateEmail = () => {
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.');
        } else {
            setPasswordError('');
        }
    };

    const validatePassword2 = () => {
        if (password !== password2) {
            setPassword2Error('Password and Confirm password must match!!!');
        } else {
            setPassword2Error('');
        }
    };


    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterUserMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const actualData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2
        }
        const res = await registerUser(actualData)
        // console.log(res)
        if (res.error) {
            console.log(res.error.data)
            setServer_error(res.error.data)
        }
        if (res.data) {
            console.log(res.data)
            // storeToken(res.data.token)
            navigate('/login')

        }
    };

    

    return (
        <>
        <div style={{ height: '89vh', display: 'flex',alignItems: 'center' ,justifyContent : 'center'}}>

            <Card className='shadow-lg p-3 mb-5 rounded' style={{ backgroundColor: '#F0F0F0' }}>

                <h3 style={{ padding: "2%", textAlign: 'center' }}>Register with BCMS</h3>


                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column', textAlign: 'center', padding: '2%' }}>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    // required
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    isInvalid={!!server_error.firstName}
                                />
                                <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                    {server_error.firstName ? server_error.firstName[0] : ''}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    // required
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    isInvalid={!!server_error.lastName}
                                />
                                <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                                    {server_error.lastName ? server_error.lastName[0] : ''}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyUp={validateEmail}
                            isInvalid={!!validateEmail}
                        />
                        <Form.Control.Feedback type="invalid" style={{ fontSize: '12px' }}>
                            {emailError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={validatePassword}
                            isInvalid={!!passwordError}
                        />

                        <Form.Control.Feedback type="invalid">
                            {passwordError}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group controlId="formPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            onKeyUp={validatePassword2}
                            isInvalid={!!password2Error}
                        />

                        <Form.Control.Feedback type="invalid">
                            {password2Error}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Button variant="secondary" type="submit" style={{ marginTop: '10px', borderRadius: '12px' }}>
                        Register
                    </Button>
                </Form>

            </Card>
        </div>

        </>
    )
}
