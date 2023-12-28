import React, { useEffect, useRef, useState } from "react";
import {
    Chart as ChartJS,
    LineController,
    BarController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";
import { useLocation } from 'react-router-dom';

const LineChart = () => {
  const chartRefBig = useRef(null);
  const chartRefSmall = useRef(null);
  const [chartData, setChartData] = useState({}); // 차트 데이터 상태 관리
  const location = useLocation();
  const keywordText = location.state.keywordText;

  const fetchData = async () => {
    const response = await fetch('http://newspeace.co.kr/mykeyword/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        keyword: keywordText
      }),
    });
    const data = await response.json();
    setChartData(data); // 서버로부터 받은 데이터로 상태 업데이트
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 차트 생성 관련 useEffect 코드
  useEffect(() => {
    
    ChartJS.register(
        LineController,
        BarController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        // Legend
      );
    
    
      // 라인 차트 데이터
    const lineChartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'], //result_time
        datasets: [
          {
            label: '삼성전자',
            data: [0, 20, 30, 40, 50, 60, 20, 10, 2, 9, 58, 42, 90, 13, 77, 65, 40, 86, 12, 33, 55, 46, 70, 25, 31], //result_negative
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointRadius: 5,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            fill: false,
          },
        ],
      };
  
      const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      };
  
      // 막대 차트 데이터
    const barChartData = {
        labels: ['09/11', '09/25', '10/16', '10/30', '11/13', '11/27', '12/11', '12/25'],
        datasets: [{
          label: 'Volume',
          data: [200000, 180000, 210000, 250000, 300000, 280000, 320000, 350000],
          backgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            // 이곳에서 값을 기준으로 상승/하락 색상을 결정합니다.
            return value > 250000 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)';
          },
          borderColor: (context) => {
            const value = context.dataset.data[context.dataIndex];
            // 이곳에서 값을 기준으로 상승/하락 색상을 결정합니다.
            return value > 250000 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)';
          },
          borderWidth: 1
        }]
       }
       
      
      const barChartOptions = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  
      // 라인 차트 생성
      const bigChartInstance = new ChartJS(chartRefBig.current.getContext('2d'), {
        type: 'line',
        data: lineChartData,
        options: lineChartOptions,
      });
  
      // 바 차트 생성
      const smallChartInstance = new ChartJS(chartRefSmall.current.getContext('2d'), {
        type: 'bar',
        data: barChartData,
        options: barChartOptions,
      });
  
      return () => {
        bigChartInstance.destroy();
        smallChartInstance.destroy();
      };
    }, []);
  
    return (
        <div className="chart-background" style={{ backgroundImage: `url(${backimg})` }}>
          <div className="chart-container">
            <div className="chart-title">시간별 키워드 부정률(%)</div>
              <div className="chart-box-big">
                <canvas ref={chartRefBig} />
              </div>
              <div className="chart-box-small">
                <canvas ref={chartRefSmall} />
              </div>
            </div>
        </div>
      );
    };

  
  export default LineChart;