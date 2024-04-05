import React from "react";
import ddperiod from "./ddperiod.json";
import  "./table.css"

const TableComponent = () => {
  
  return (
    <table className="drawdown-table" >
      <thead>
        <tr>
          <th >Period</th>
          <th>Max DD</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody>
        {ddperiod.data.map((period, index) => (
          <tr key={index}>
            <td>
              {period.Start_Date} - {period.End_Date}
            </td>
            <td style={{color:"red"}}>{period.Max_Drawdown}</td>
            <td>{period.Drawdown_days}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
