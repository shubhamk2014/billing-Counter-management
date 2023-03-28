import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function MonthlySell() {

  const [year] = useState(2022);
  const [bills, setBills] = useState([]);
  const [billItems, setBillItmes] = useState([]);

  const [monthlySales,setmonthlySales] = useState([
    1500, 2000, 1800, 2200, 2300, 2500, 2600, 2800, 3000, 3200, 2800, 3500
  ]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/bills/')
      .then(response => {
        setBills(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get('http://127.0.0.1:8000/billitems/')
      .then(response => {
        setBillItmes(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      const totalSum = bills.reduce((acc, cur) => acc + cur.price, 0);
      setmonthlySales(totalSum)
      // console.log(monthlySales)
      // const months = billItems.map(bill => new Date(bill.billdate).getMonth());
      // console.log(months); 





  }, []);


  const data = [
    { month: 'January', sales: monthlySales[0] },
    { month: 'February', sales: monthlySales[1] },
    { month: 'March', sales: monthlySales[2] },
    { month: 'April', sales: monthlySales[3] },
    { month: 'May', sales: monthlySales[4] },
    { month: 'June', sales: monthlySales[5] },
    { month: 'July', sales: monthlySales[6] },
    { month: 'August', sales: monthlySales[7] },
    { month: 'September', sales: monthlySales[8] },
    { month: 'October', sales: monthlySales[9] },
    { month: 'November', sales: monthlySales[10] },
    { month: 'December', sales: monthlySales[11] },
  ];
  const totalSales = data.reduce((acc, cur) => acc + cur.sales, 0);

  return (
    <>
      <div style={{ width: '90%' }}>
        <div style={{ borderBottom: '2px solid' }}>
          <h1>Monthly Sell</h1>
          <div>YEAR: {year}</div>
          <div>TOTAL SELL: {totalSales}</div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="gray" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
