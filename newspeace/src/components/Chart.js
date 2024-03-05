import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { useLocation } from 'react-router-dom';

const Chart = ({ data, type, title, title1 }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드';
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/graph/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ name: keywordText }),
        });
        const data = await response.json();

        setStockData(data);
        console.log(data.result_time);
        console.log(data.result_present);
        console.log(data.result_negative);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [apiUrl, keywordText]);

  useEffect(() => {
    // 그래프1 설정
    const chartDom1 = document.getElementById('negative-chart');
    const echart1 = echarts.init(chartDom1);

    const option1 = {
      grid: {
        left: '10%',   // 왼쪽 여백
        right: '10%',  // 오른쪽 여백
        top: '10%',    // 상단 여백
        bottom: '16%', // 하단 여백
        containLabel: true, // 레이블이 차트를 벗어나지 않도록 설정
      },
      xAxis: {
        type: 'category',
        data: stockData.result_time
          ? stockData.result_time.map((time) =>
              new Date(time).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            )
          : [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Negative',
          data: stockData.result_negative,
          type: 'line',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          handleSize: '20%',
          handleStyle: {
            color: '#FF7F27',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
    };

    echart1.setOption(option1);

    return () => {
      echart1.dispose();
    };
  }, [stockData]);

  useEffect(() => {
    // 그래프2 설정
    const chartDom2 = document.getElementById('present-chart');
    const echart2 = echarts.init(chartDom2);

    const option2 = {
      grid: {
        left: '10%',   // 왼쪽 여백
        right: '10%',  // 오른쪽 여백
        top: '10%',    // 상단 여백
        bottom: '16%', // 하단 여백
        containLabel: true, // 레이블이 차트를 벗어나지 않도록 설정
      },
      xAxis: {
        type: 'category',
        data: stockData.result_time
          ? stockData.result_time.map((time) =>
              new Date(time).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            )
          : [],
      },
      yAxis: {
        type: 'value',
        min: function (value) {
          const minValue = Math.floor(value.min - (value.max - value.min) * 0.1);
          return Math.max(0, minValue);
        },
      },
      series: [
        {
          name: 'Present',
          data: stockData.result_present,
          type: 'line',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          handleSize: '20%',
          handleStyle: {
            color: '#FF7F27',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
    };

    echart2.setOption(option2);

    return () => {
      echart2.dispose();
    };
  }, [stockData]);

  return (
    <div>
      <h3>{title}</h3>
      <div id="negative-chart" style={{ height: '300px' }}></div>
      <h3>{title1}</h3>
      <div id="present-chart" style={{ height: '300px' }}></div>
    </div>
  );
};

export default Chart;
