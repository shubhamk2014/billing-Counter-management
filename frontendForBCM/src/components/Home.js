import React from 'react';
import Menu from './Menu';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <>
      <Row>
        <Navbar />
      </Row>
      <Row>
        <Col xs = {3}>
          <Menu />
        </Col>
        <Col style={{ height: '89vh', display: 'flex',alignItems: 'center' ,justifyContent : 'center'}}>
          <Outlet />
        </Col>
      </Row>

    </>
  )
}
