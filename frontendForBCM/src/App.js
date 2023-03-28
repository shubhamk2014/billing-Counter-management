import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/auth/Login.js';
import LogReg from './components/auth/LogReg.js';
import Newbill from './components/Bill/Newbill.js';
import Bills from './components/Bill/Bills.js';
import BillDetails from './components/Bill/BillDetails.js';
import Customers from './components/Customers/Customers.js'
import NewCustomer from './components/Customers/NewCustomer.js'
import CustomerDetails from './components/Customers/CustomerDetails.js'
import MonthlySell from './components/Analytics/MonthlySell.js';
import ProductsSell from './components/Analytics/ProductsSell.js';
import Auth from './components/auth/Auth.js';
import EditCustomer from './components/Customers/EditCustomer.js';
import { useSelector } from 'react-redux';
import Protected from './Protected.js';
import Authentication from './Authentication.js';





function App() {
  const { access_token } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Authentication />}>
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<LogReg />} />
        </Route>
        {/* <Route element={<Protected />}> */}
          <Route path='/' element={<Home />} >
            {/* <Route path="/home" element={<Home />}> */}
            <Route index element={<Customers />} />
            <Route path='/bills' element={<Bills />} />
            <Route path='/bills/newBill' element={<Newbill />} />
            <Route path='/bills/billDetails/:billNo/:mobile' element={<BillDetails />} />
            <Route path='/customers/newCustomer' element={<NewCustomer />} />
            <Route path='/customers/customerDetails/:mobile' element={<CustomerDetails />} />
            <Route path='/customers/editCustomer/:moNum' element={<EditCustomer />} />

            <Route path='/monthlySell' element={<MonthlySell />} />
            <Route path='/productsSell' element={<ProductsSell />} />

          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;