import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import dd from "./ddperiod.json"

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "rgba(41, 98, 255, 0)",
      areaBottomColor = "rgba(41, 98, 255, 0)",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();
    chart.priceScale("left").applyOptions({
      visible: true,
      textColor: "black",
    });
    chart.priceScale("right").applyOptions({
      visible: false,
      textColor: "black",
    });
    const myPriceFormatter = (p) => p.toFixed(2);
    // Apply the custom priceFormatter to the chart
    chart.applyOptions({
      localization: {
        priceFormatter: myPriceFormatter,
      },
    });
    dd.data.forEach((period) => {
      const startTime = new Date(period.Start_Date).getTime();
      const endTime = new Date(period.End_Date).getTime();
   
    chart.applyOptions({
      highlightedArea: {
        x: startTime,
        y: endTime,
        fillColor: 'red',
      },
    }); 
  })
    const newSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} style={{width:"50%", margin:"50px"}} />;
};
export default ChartComponent;
