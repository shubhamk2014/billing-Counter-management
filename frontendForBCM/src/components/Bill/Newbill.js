import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { TiDeleteOutline } from 'react-icons/ti'
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Newbill() {
  const [billNum, setBillNum] = useState('');
  const [mobile, setMobile] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [items, setItems] = useState([]);
  const [bills, setBills] = useState([]);
  const [billRes, setBillRes] = useState('');
  const [itemRes, setItemRes] = useState('');

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  

  // diplay name fetched from server
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: ""
  })

  useEffect(() => {

    if (data && isSuccess) {
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName
      })
    }
  }, [data, isSuccess])


  const mobileRegex = /^[6-9]\d{9}$/;
  function validateMobile(value) {
    if (mobileRegex.test(value)) {
      setMobile(value);
    } else {
      setMobile('');
    }
  };
  // function for handling search
  function handleSearch(e) {
    setMobile(e.target.value)
  }

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
    setBillNum(number);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // generateRandomNumber()
    const newItem = {
      billNum: billNum,
      item: item,
      price: price,
      quantity: quantity
    };
    const newBill = {
      billno: billNum,
      mobile: mobile,
      billdate: date,
      counter: 1,
      cashier: userData.firstName + ' ' + userData.lastName,
      paymentmode: paymentMethod
    };
    setItems([...items, newItem]);
    setBills([...bills, newBill]);
    // setItem('');
    // setPrice('');
    // setQuantity('');
    // setBillNum('');
    // setMobile('');
    // setPaymentMethod('');
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += calculateTotalPrice(item.price, item.quantity);
    });
    return total;
  };

  const calculateGST = () => {
    const grandTotal = calculateGrandTotal();
    return (grandTotal * 0.18).toFixed(2); // assuming GST rate of 5%
  };

  const calculateTotalWithGST = () => {
    const grandTotal = calculateGrandTotal();
    const gst = calculateGST();
    return Number(gst) + Number(grandTotal);
  };

  const handlePaymentMethodChange = (eventKey) => {
    console.log(eventKey)
    setPaymentMethod(eventKey);
  };

  const navigate = useNavigate();
  const handleCheckout = () => {
    // console.log(items);
    // console.log(bills);
    if (itemRes && billRes) {
      navigate('/bills')
    }
    items.forEach(element => {
      axios.post('http://127.0.0.1:8000/billitems/', element)
        .then(response => setItemRes(response))
        // .then(response => navigate('/home/bills/billDetails'))
        .catch(
          error => {
            console.log(error.response)

          }
        );
    });
    bills.forEach(element => {
      axios.post('http://127.0.0.1:8000/bills/', element)
        .then(response => setBillRes(response))
        // .then(response => navigate('/home/bills/billDetails'))
        .catch(
          error => {
            console.log(error.response)

          }
        );
    });
  
  };



  return (
    <>
      <div style={{ width: '100%', }}>


        <div className='d-flex borLen' style={{ width: '90%', justifyContent: 'space-between' }}>
          <div>
            <h1>New Bill</h1>
            <div>
              MOBILE
              <Form onSubmit={handleSearch} style={{ display: 'flex' }} >

                <Form.Group controlId="mobile">
                  <Form.Control
                    type="text"
                    placeholder="mobile Number"
                    // value={mobile}
                    onChange={(e) => validateMobile(e.target.value)}
                  // onKeyUp = {}
                  />

                </Form.Group>
              </Form>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'end', alignItems: 'end' }}>
            <div>
              DATE : {new Date().toLocaleString()}
            </div>
            <div>
              {/* CASHIER : ABC */}
              CASHIER : {userData.firstName}{' '}{userData.lastName}
            </div>
            <div>
              COUNTER : 1
            </div>
          </div>
        </div>

        {mobile ?
          <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
            <Form onSubmit={handleAddItem} style={{ display: 'flex', marginTop: '3%', columnGap: '.8%', marginBottom: '1%' }}>

              <Form.Group controlId="item">
                <Form.Label>Item:</Form.Label>
                <Form.Control type="text" value={item} onChange={(e) => setItem(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price:</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </Form.Group>
              <Button variant="secondary" onClick={generateRandomNumber} type="submit" style={{ height: 'fit-content', alignSelf: 'end' }}>
                Generate Bill Number and Add
              </Button>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.item}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{calculateTotalPrice(item.price, item.quantity)}</td>
                    <td>
                      <TiDeleteOutline onClick={() => handleDeleteItem(index)} style={{ fontSize: '1.8rem', color: 'blue' }} />

                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right' }}>
                    Total
                  </td>
                  <td>{calculateGrandTotal()}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right' }}>
                    GST
                  </td>
                  <td>{calculateGST()}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right' }}>
                    GRAND TOTAL
                  </td>
                  <td>{calculateTotalWithGST()}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
          : ''}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: '90%' }}>
          <DropdownButton
            id="dropdown-basic-button"
            variant='secondary'
            title={paymentMethod ? `${paymentMethod}` : 'Payment Method'}
            onSelect={handlePaymentMethodChange}

          >
            <Dropdown.Item eventKey="cash">Cash</Dropdown.Item>
            <Dropdown.Item eventKey="card">Card</Dropdown.Item>
            <Dropdown.Item eventKey="upi">UPI</Dropdown.Item>
          </DropdownButton>
          <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
}
