import React, { useState } from 'react';
import { PieChart, Pie, Cell} from 'recharts';

export default function ProductsSell() {
  const [year, setYear] = useState(2022);
  const [productSales, setProductSales] = useState([
    { name: 'Product A', value: 500 },
    { name: 'Product B', value: 800 },
    { name: 'Product C', value: 1200 },
    { name: 'Product D', value: 1500 },
    { name: 'Product E', value: 2000 },
  ]);

  const colors = ['#000', '#484848', ' #303030', '#484848', '#A9A9A9', '#585858'];
  const totalSales = productSales.reduce((acc, cur) => acc + cur.value, 0);
  console.log(totalSales)

  return (
    <>
      <div style={{ width: '90%' }}>
        <div style={{ borderBottom: '2px solid' }}>
          <h1>Products Sell</h1>
          <div>YEAR: {year}</div>
          <div>TOTAL SELL: {totalSales}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {productSales.length > 0 ? 
            <PieChart width={400} height={400}>
            <Pie
              data={productSales}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {productSales.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
           : 
            <p>No data to display.</p>
          }
        </div>
      </div>
    </>
  );
}
