import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import axios from 'axios';
import { useParams } from 'react-router';
// const items = [
//   { Sr: 1, Item: 'Product 1', Price: 10, Quantity: 2, billno: 12321 },
//   { Sr: 2, Item: 'Product 2', Price: 20, Quantity: 1, billno: 121 },
//   { Sr: 3, Item: 'Product 3', Price: 5, Quantity: 4, billno: 1231 },
// ];

export default function BillDetails() {
  const [data1, setData1] = useState([]);
  const { access_token } = getToken()
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
    firstName : "",
    lastName : ""
  })
  const { billNo, mobile } = useParams();
 
  useEffect(() =>{

    if (data && isSuccess){
      setUserData({
        firstName:data.firstName,
        lastName:data.lastName
      })
    }
  }, [data,isSuccess])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:8000/billitems/${billNo}`);
      setData1([result.data]);
    };
    fetchData();
  }, []);
  
  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };
  
  const calculateGrandTotal = () => {
    // console.log(data1)
    let total = 0;
    data1.forEach((item) => {

      total += calculateTotalPrice(item.price, item.quantity);
    });
    // console.log(total)
    return total;
  };

  const calculateGST = () => {
    const grandTotal = calculateGrandTotal();
    return (grandTotal * 0.18).toFixed(2);
  };

  const calculateTotalWithGST = () => {
    const grandTotal = calculateGrandTotal();
    // console.log(grandTotal)
    const gst = calculateGST();
    return Number(grandTotal) + Number(gst);
  };






  return (
    <>
      <div style={{ width: '100%' }}>
        <div className='d-flex borLen' style={{ width: '90%', justifyContent: 'space-between' }}>
          <div>
            <h1>Bill Details</h1>
            <div>
              BILL #: {billNo}
            </div>
            <div>
              MOBILE: {mobile}
            </div>
            <div>
              PAYMENT: CARD
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'end', alignItems: 'end' }}>
            <div>
              DATE : {new Date().toLocaleString()}
            </div>
            <div>
              CASHIER : {userData.firstName}{' '}{userData.lastName}
            </div>
            <div>
              COUNTER : 1
            </div>
          </div>
        </div>

        <Table striped bordered hover style={{width:'90%', marginTop:'2%' }}>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.item}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{calculateGrandTotal(item.price, item.quantity)}</td>

              </tr>
            ))}
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>
                Total
              </td>
              <td>{calculateGrandTotal()}</td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>
                GST
              </td>
              <td>{calculateGST()}</td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: 'right' }}>
                GRAND TOTAL
              </td>
              <td>{calculateTotalWithGST()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
