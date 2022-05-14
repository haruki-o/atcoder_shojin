import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationType, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { User, Graph} from '../interface/index';

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
  const options = {
    //凡例は非表示
    legend: {
      display: false
    },
    scales: {
        //X軸
        xAxes: [{
          //軸ラベル表示
          scaleLabel: {
            display: true,
            labelString: '時間'
          },
          //ここで軸を時間を設定する
          type: 'time',
          time: {
              parser: 'mm/dd',
              unit: 'Month',
              stepSize: 1,
              displayFormats: {
                  'month': 'mm/dd'
              }
          },
          //X軸の範囲を指定
          ticks: {
              min: '01/01',
              max: '12/31'
          }
        }],
        //Y軸
        yAxes: [{
            //軸ラベル表示
            scaleLabel: {
                display: true,
                labelString: '体温'
            },
            //Y軸の範囲を指定
            ticks: {
                min: 34.0,
                max: 38.0
            }
        }]
    }
  }
  return(
    <div style={{width: "90%"}}>
      a
      <Line data = { data } options = { options } />
    </div>
  )
}