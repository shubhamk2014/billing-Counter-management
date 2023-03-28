import { Form, Button, Table, Pagination, } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Bills() {
  const [mobile, setMobile] = useState('');
  const [billNum, setBillNum] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [counter, setCounter] = useState('');
  const [cashier, setCashier] = useState('');
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  // update data 
  useEffect(() => {
    // Fetch all bills and bill items from the API
    axios.get('http://127.0.0.1:8000/bills/')
      .then(response => {
        const billsData = response.data;
        const billIds = billsData.map(bill => bill.billno);

        axios.get('http://127.0.0.1:8000/billitems/')
          .then(response => {
            const billItemsData = response.data;

            // Calculate the total amount for each bill
            const amounts = billIds.map(billId => {
              const itemsForBill = billItemsData.filter(item => item.billNum === billId);
              // console.log(itemsForBill)
              const totalAmountForBill = itemsForBill.reduce((acc, item) => acc + item.price * item.quantity, 0);
              // console.log(totalAmountForBill)
              return totalAmountForBill;
            });

            // Merge bill data and amount data into a single array
            const mergedData = billsData.map((bill, index) => {
              return {
                ...bill,
                amount: amounts[index]
              }
            });

            setBills(mergedData);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);


  // variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bills.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(bills.length / rowsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  // function for handling search
  function handleSearch(event) {
    // console.log(event.target.value)
  }


  function handleClick(x, y) {
    navigate(`/bills/billDetails/${x}/${y}`)
  }
  function handleClickWithMobile(value) {
    navigate(`/customers/customerDetails/${value}`)
  }

  function handlebillNumSearch(billno) {
    // console.log(billno)
  }
  function handlemobileSearch(mob) {
    // console.log(billno)
  }
  function handledateSearch(billno) {
    // console.log(billno)
  }
  function handleamountSearch(billno) {
    // console.log(billno)
  }
  function handlecounterSearch(billno) {
    // console.log(billno)
  }
  function handlecashierSearch(billno) {
    // console.log(billno)
  }

  return (
    <>
      <div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%', width: '90%' }}>

          <h1>Bill</h1>

          <Button variant='secondary' className='mb-2' href='/bills/newBill'>New Bill</Button>
        </div>
        <h2 style={{ lineHeight: '0.1rem', margin: '10px 10px -1px' }}>
          <span style={{ background: '#fff', padding: '0 10px' }}>Search Filter
          </span>
        </h2>
        <div style={{ border: '2px solid black', width: '90%' }}>

          <Form onSubmit={handleSearch} style={{ display: 'flex', margin: '6%' }} >

            <Form.Group controlId="mobile">
              <Form.Control
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              // onKeyUp = {handleSearch}
              />

            </Form.Group>
            <Form.Group controlId="billNum" style={{ margin: '0% .8%' }}>
              <Form.Control
                type="text"
                placeholder="Bill Number"
                value={billNum}
                onChange={(e) => setBillNum(e.target.value)}
              // onKeyUp = {handleSearch}
              />

            </Form.Group>
            <Form.Group controlId="date">
              <Form.Control
                type="text"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              // onKeyUp = {handleSearch}
              />

            </Form.Group>
            <Form.Group controlId="counter" style={{ margin: '0% .8%' }}>
              <Form.Control
                type="text"
                placeholder="Counter"
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
              // onKeyUp = {handleSearch}
              />

            </Form.Group>
            <Form.Group controlId="cashier" >
              <Form.Control type="text" placeholder="Cashier" value={cashier}
                onChange={(e) => setCashier(e.target.value)}
              // onKeyUp = {handleSearch}
              />
            </Form.Group>
            <Button variant='secondary' className='mb-2' style={{ marginLeft: '.8%' }}>Search</Button>
          </Form>

        </div>

        {/* TAble with search fields */}
        <div style={{ width: '90%' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>
                  <Form.Group controlId="billNum" style={{ margin: '0% .8%' }}>
                    <Form.Control
                      type="text"
                      placeholder="Bill Number"
                      value={billNum}
                      onChange={(e) => setBillNum(e.target.value)}
                      onKeyUp={handlebillNumSearch}
                    />

                  </Form.Group>
                </th>
                <th>
                  <Form.Group controlId="mobile">
                    <Form.Control
                      type="text"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      onKeyUp={handlemobileSearch}
                    />

                  </Form.Group>
                </th>
                <th>
                  <Form.Group controlId="amount" style={{ margin: '0% .8%' }}>
                    <Form.Control
                      type="text"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyUp={handleamountSearch}
                    />

                  </Form.Group>
                </th>
                <th>
                  <Form.Group controlId="date">
                    <Form.Control
                      type="text"
                      placeholder="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      onKeyUp={handledateSearch}
                    />

                  </Form.Group>
                </th>
                <th>
                  <Form.Group controlId="counter" style={{ margin: '0% .8%' }}>
                    <Form.Control
                      type="text"
                      placeholder="Counter"
                      value={counter}
                      onChange={(e) => setCounter(e.target.value)}
                      onKeyUp={handlecounterSearch}
                    />
                  </Form.Group>
                </th>
                <th>
                  <Form.Group controlId="cashier" style={{ width: '132px' }}>
                    <Form.Control type="text" placeholder="Cashier" value={cashier}
                      onChange={(e) => setCashier(e.target.value)}
                      onKeyUp={handlecashierSearch}
                    />
                  </Form.Group>
                </th>
              </tr>
              <tr>
                <th>Sr</th>
                <th>Bill Number</th>
                <th>Mobile</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Counter</th>
                <th>Cashier</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td> navigate{row.billno}</td> */}
                  <td><button style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent', cursor: 'pointer',
                  }} onClick={() => handleClick(row.billno, row.mobile)}>{row.billno}</button></td>
                  <td><button style={{
                    backgroundColor: 'transparent', borderColor: 'transparent',
                    cursor: 'pointer',
                  }} onClick={() => handleClickWithMobile(row.mobile)}>{row.mobile}</button></td>

                  <td>{row.amount}</td>
                  <td>{row.billdate}</td>
                  <td>{row.counter}</td>
                  <td>{row.cashier}</td>
                </tr>
              ))}
            </tbody>
          </Table>

        </div>
        <div style={{ width: '90%' }}>

          <Pagination style={{ float: 'right' }}>
            <div style={{ marginRight: '5px' }}>Pages</div>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item className='page-link' key={i} active={i + 1 === currentPage} onClick={() => handlePageClick(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>



    </>
  )
}
