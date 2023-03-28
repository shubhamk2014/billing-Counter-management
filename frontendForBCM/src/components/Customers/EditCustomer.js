import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function EditCustomer() {
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const { moNum } = useParams();
  
  const navigate = useNavigate();
  const handleAddItem = (e) => {
    e.preventDefault();

    // Make an HTTP request to update the customer details
    axios.put(`http://127.0.0.1:8000/customers/${moNum}/`, { name, mobile,dob })
      .then(response => {
        console.log(response.data);
        navigate('/')
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <>
     
      <Form onSubmit={handleAddItem} style={{ display: 'flex', marginTop: '3%', columnGap: '.8%', marginBottom: '1%' }}>
        <Form.Group controlId="mobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="dob">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </Form.Group>
        <Button variant="secondary" type="submit" style={{ height: 'fit-content', alignSelf: 'end' }}>
          Save Changes
        </Button>
      </Form>
    </>
  )
}
