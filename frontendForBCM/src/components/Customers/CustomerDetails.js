
import { useEffect, useState } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';
// const data1 = [
//   { Sr: 1, mobile_number: '1234567890', name: 'John Doe', since: '2022-01-01', action: 'Edit' },
//   { Sr: 2, mobile_number: '2345678901', name: 'Jane Smith', since: '2022-02-01', action: 'Delete' },
//   // more data...
// ];
export default function CustomerDetails() {
  const [data, setData] = useState([0])
  const { mobile } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:8000/customers/${mobile}/`);
      // setData(result.data);
      // console.log(result.data)
      const result1 = await axios.get(`http://127.0.0.1:8000/bills/byMobile/${mobile}/`);
      // // setData([result.data]);
      // const result2 = await axios.get(`http://127.0.0.1:8000/billitems/${mobile}/`);
      const data1 = [
        { ...result.data },
        { ...result1.data },
        
      ];
      setData(data1)
    };
    fetchData();
  }, []);

  function handleShowMore() {
    console.log(data[1][0])
  }


  return (
    <>

      <div style={{ width: '90%' }}>
        <h1>Customer Details</h1>
        <Row>
          <Col xs={2}>NAME</Col>
          <Col>{data[0].name ? data[0].name : ''}</Col>
        </Row>
        <Row>
          <Col xs={2}>EMAIL</Col>
          <Col >{data[0].email ? data[0].email : ''}</Col>
        </Row>
        <Row>
          <Col xs={2}>MOBILE</Col>
          <Col>{data[0].mobile ? data[0].mobile : ''}</Col>
        </Row>
        <Row>
          <Col xs={2}>DOB</Col>
          <Col>{data[0].dob ? data[0].dob : ''}</Col>
        </Row>
        <hr />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr</th>
              <th>Bill</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((outerKey, index) => (
              Object.keys(data[outerKey]).map((innerKey, subIndex) => {
                const rowNumber = subIndex + 1;
                if (data[outerKey][innerKey].billno) {
                  return (
                    <tr key={`${index}-${subIndex}`}>
                      <td>{rowNumber}</td>
                      <td>{data[outerKey][innerKey].billno}</td>
                      <td>{data[outerKey][innerKey].billdate}</td>
                      <td>{data[outerKey][innerKey].billno}</td>
                      <td>{data[outerKey][innerKey].paymentmode}</td>
                    </tr>
                  );
                } else {
                  return null; // Skip rows with blank billno
                }
              })
            ))}
          </tbody>
        </Table>

        <Button onClick={handleShowMore} variant='secondary' style={{ float: 'right' }}>Click Here to All Transititions</Button>

      </div>
    </>
  )
}
