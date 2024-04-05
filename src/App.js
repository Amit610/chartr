import "./App.css";
import React from "react";
import ChartComponent from "./componants/ChartComponent";
import TableComponent from "./componants/TableComponent";
import data from "./componants/returns.json";

function App(props) {
  const initialData = data.data.combined;

  return (
    <>
    <h1 style={{marginLeft:"50px"}}>Drawdown Periods</h1>
    <div style={{ display: "flex", backgroundColor: "#a77575;" }}>
      <ChartComponent {...props} data={initialData}></ChartComponent>
      <TableComponent />
    </div>
    </>
  );
}

export default App;
