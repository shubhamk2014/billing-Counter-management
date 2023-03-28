import { useState, useEffect } from 'react';
import { Table, Pagination, Button, Form } from 'react-bootstrap';
import { TiEdit } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobile, setMobile] = useState('');
  const [customers, setCustomers] = useState([]);
  // const [customers1, setCustomers1] = useState([]);
  const navigate = useNavigate();
  // fetch the data from server
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  // handle delete button
  const handleDelete = (mobile) => {
    axios.delete(`http://127.0.0.1:8000/customers/${mobile}/`)
      .then(() => setCustomers(customers.filter(customer => customer.mobile !== mobile)))
      .catch(error => console.error(error));
  };

  // handle edit button
  const handleClick = (mobile) => {
    navigate(`/customers/editCustomer/${mobile}`)
    // console.log(mobile)
  };

  function customerDetailsWithMobile(value) {
    console.log(value)
    navigate(`/customers/customerDetails/${value}`)

  }

  // Pagination logic
  const rowsPerPage = 3;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let currentRows = customers.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(customers.length / rowsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      <div style={{ width: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Customers</h2>
          <div style={{ display: 'flex' }}>

            <Button className='mb-2' variant='secondary' href='/customers/newCustomer'>New Customer</Button>
            <Form style={{ display: 'flex' }}>
              <Form.Control
                style={{ width: '300px', marginLeft: '10px' }}
                type="text"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="Search by mobile no"
              />
              {/* <Button style={{ marginLeft: '10px' }} variant="primary" onClick={searchMobile}>Search</Button> */}
            </Form>
            
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Mobile</th>
              <th>Name</th>
              <th>Since</th>
              <th>Action</th>
            </tr>
          </thead>
          {!mobile ?
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.mobile}>
                <td>{index + 1}</td>
                <td><button style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent', cursor: 'pointer',
                }} onClick={() => customerDetailsWithMobile(item.mobile)}>{item.mobile}</button></td>
                {/* <td>{item.mobile}</td> */}
                <td>{item.name}</td>
                <td>{item.created_at}</td>
                <td>
                  <div>
                    <Button variant="warning" onClick={() => handleClick(item.mobile)}><TiEdit /></Button>
                    <Button variant="danger" onClick={() => handleDelete(item.mobile)}><AiFillDelete /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
                :
          <tbody>
            {currentRows.filter(item1=> item1.mobile === mobile)
            .map((item, index) => (
              <tr key={item.mobile}>
                <td>{index + 1}</td>
                <td><button style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent', cursor: 'pointer',
                }} onClick={() => customerDetailsWithMobile(item.mobile)}>{item.mobile}</button></td>
                {/* <td>{item.mobile}</td> */}
                <td>{item.name}</td>
                <td>{item.created_at}</td>
                <td>
                  <div>
                    <Button variant="warning" onClick={() => handleClick(item.mobile)}><TiEdit /></Button>
                    <Button variant="danger" onClick={() => handleDelete(item.mobile)}><AiFillDelete /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
}
        </Table>


        <Pagination style={{ float: 'right' }}>
          <div style={{ marginRight: '5px' }}>Pages</div>
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageClick(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  )
}


