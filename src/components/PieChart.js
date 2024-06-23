import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = {
    labels: data.map(track => track.name),
    datasets: [{
      label: 'Popularity',
      data: data.map(track => track.popularity),
      backgroundColor: data.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`)
    }]
  };

  return <Pie ref={chartRef} data={chartData} />;
};

export default PieChart;
