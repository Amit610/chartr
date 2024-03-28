// ChartComponent.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const ChartComponent = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const ddPeriodResponse = await axios.get('./ddperiod.json');
        const returnsResponse = await axios.get('./returns.json');

        const ddPeriodData = ddPeriodResponse.data;
        const returnsData = returnsResponse.data;

        console.log('ddPeriodData:', ddPeriodData);
        console.log('returnsData:', returnsData);

        const chart = createChart(chartContainerRef.current, {
          width: 800,
          height: 400,
        });

        const series = chart.addLineSeries();
        series.setData(returnsData.combined);

        // Highlight areas based on periods from ddPeriodData
        ddPeriodData.periods.forEach((period) => {
          chart.timeScale().setVisibleRange({
            from: period.start,
            to: period.end,
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChartData();
  }, []);

  return <div ref={chartContainerRef}></div>;
};

export default ChartComponent;
