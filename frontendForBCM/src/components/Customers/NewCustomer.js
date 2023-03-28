import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function NewCustomer() {
  const [CustomerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNum, setmobileNum] = useState('');
  const [dob, setDob] = useState('');
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [dobError, setDobError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const mobileRegex = /^[6-9]\d{9}$/;
  const validateMobileNum = () => {
    if (!mobileRegex.test(mobileNum)) {
      setMobileError('Please enter a valid mobile number');
    } else {
      setMobileError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/customers/', { mobile: mobileNum, name: CustomerName, dob: dob, email: email })
      .then(response => navigate('/'))
      .catch(
        error => {
            console.log(error.response.data)

        }
        );

  };
  return (
    <>
      <div style={{ width: '40%' }}>
        <h3 style={{ padding: "2%", textAlign: 'center' }}>New Customer</h3>
        <Card className='shadow-lg p-3 mb-5 rounded' style={{ backgroundColor: '#F0F0F0' }}>



          <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column', padding: '2%', textAlign: 'center' }}>

            <Form.Group controlId="formLastName">
              <Form.Label>NAME</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name.
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="formEmail">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={validateEmail}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMobile">
              <Form.Label>MOBILE</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter mobile number"
                value={mobileNum}
                onChange={(e) => setmobileNum(e.target.value)}
                onKeyUp={validateMobileNum}
                isInvalid={!!mobileError}
                />
              <Form.Control.Feedback type="invalid">
                {mobileError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Enter Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                isInvalid={!!dobError}
                />
              <Form.Control.Feedback type="invalid">
                {dobError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="secondary" type="submit" style={{ marginTop: '10px', borderRadius: '12px' }}>
              Create
            </Button>
          </Form>

        </Card>
      </div>

    </>
  )
}
