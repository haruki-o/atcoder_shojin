import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Graph } from '../interface/index';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface LinePlotProps {
  afterProcessData: Graph
}
export const LinePlot:React.FC<LinePlotProps> = ({ afterProcessData }) => {
  const data = {
    labels: afterProcessData.date,
    datasets: [
      {
        label: "First dataset",
        data: afterProcessData.performance,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }
  return(
    <div style={{width: "90%"}}>
      <Line data={data} />
    </div>
  )
}