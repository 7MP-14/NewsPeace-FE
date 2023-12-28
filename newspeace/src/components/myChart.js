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
import { Line } from 'react-chartjs-2';

import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";
import { useLocation } from 'react-router-dom';

const LineChart = () => {
  const chartRefBig = useRef(null);
  const chartRefSmall = useRef(null);
  const location = useLocation();
  const keywordText = location.state.keywordText; // ?. 연산자를 사용하여 state가 정의되지 않은 경우를 처리
  const [chartData, setChartData] = useState({  // 차트 데이터 상태 관리
    labels: [],
    datasets: [
      {
        label: '부정도 %',
        data: [],
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
  }); 
  
   // 현재 날짜를 YYYY-MM-DD 형식으로 포맷하는 함수
   const formatDate = (date) => {
    const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
};

  // 현재 날짜 상태
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));


  const fetchData = async () => {
    try {
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
    const negatives = data.result_negative;
    const times = data.result_time.map(time => {
        // 'T'로 분리하여 시간 부분만 추출하고, ':'로 분리한 후 시와 분만을 결합합니다.
        const timeParts = time.split('T')[1].split(':');
        return `${timeParts[0]}:${timeParts[1]}`; // 시:분 형태로 반환
      });
      

    setChartData(prevChartData => ({
        ...prevChartData,
        labels: times,
        datasets: [{
          ...prevChartData.datasets[0],
          data: negatives
        }]
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keywordText]);

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
        Legend
      );
    
      // 라인 차트 생성
      const bigChartInstance = new ChartJS(chartRefBig.current.getContext('2d'), {
        type: 'line',
        data: chartData,
        options: {
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
        },
      });

  
      return () => {
        bigChartInstance.destroy();
        
      };
    }, [chartData]);
  

    return (
        <div className="chart-background" style={{ backgroundImage: `url(${backimg})` }}>
          <div className="chart-container">
            <div className="chart-title">{currentDate} 시간별 키워드 부정률(%)</div>
              <div className="chart-box-big">
                <canvas ref={chartRefBig} />
              </div>

            </div>
        </div>
      );
    };

  
  export default LineChart;