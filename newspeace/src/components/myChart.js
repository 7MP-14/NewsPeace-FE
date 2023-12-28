import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation } from 'react-router-dom';
import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";

const LineChart = () => {
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드'; // state가 정의되지 않은 경우 기본값 사용
  
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      background: '#ffffff'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    xaxis: {
      type: 'category',
    },
    yaxis: {
      max: 120,
      min: 0
    }
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://newspeace.co.kr/mykeyword/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({ keyword: keywordText })
          
        });
        const data = await response.json();

        // 데이터 처리
        const times = data.result_time.map(time => {
          const [date, timeOfDay] = time.split('T');
          const [year, month, day] = date.split('-');
          const [hours, minutes] = timeOfDay.split(':');
          return `${month}/${day} ${hours}:${minutes}`; // MM/DD HH:MM 형태로 반환
        });
        const negatives = data.result_negative.map(value => (value === -1 ? 0 : value));

        // 차트 데이터 설정
        setSeries([{
          name: '부정도 %',
          data: negatives
        }]);

        // 차트 옵션 설정
        setOptions(prevOptions => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: times
          }
        }));


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [keywordText]);

  return (
    <div className='chart-background' style={{ backgroundImage: `url(${backimg})` }}>
      <div className='chart-container'>
        <div className='chart-title'><strong>{keywordText}</strong> 시간별 부정률(%)</div>
        <div className='chart-box'>
          <ReactApexChart options={options} series={series} type='line' height={350} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
