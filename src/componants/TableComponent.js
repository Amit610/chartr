// TableComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const returnsResponse = await axios.get('/returns.json');
        const returnsData = returnsResponse.data;

        setTableData(returnsData.combined);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <div>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              {Object.values(rowData).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
