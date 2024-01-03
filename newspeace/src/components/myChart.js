import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation } from 'react-router-dom';
import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";

const LineChart = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드'; // state가 정의되지 않은 경우 기본값 사용
  const [sentimentSeries, setSentimentSeries] = useState([]);
  const [stockSeries, setStockSeries] = useState([]);
  const [options, setOptions] = useState({
    sentimentOptions: {
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
    },
    stockOptions: {
      chart: {
        height: 350,
        type: 'area',
        zoom: {
          autoScaleYaxis: true
        },
        background: '#ffffff'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        max: 100000,
        min: 0
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      }
    }
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/mykeyword/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({ keyword: keywordText })
          
        });
        const data = await response.json();
        console.log(data);
        // 데이터 처리
        const times = data.result_time.map(time => {
          const [date, timeOfDay] = time.split('T');
          const [year, month, day] = date.split('-');
          const [hours, minutes] = timeOfDay.split(':');
          return `${month}/${day} ${hours}:${minutes}`; // MM/DD HH:MM 형태로 반환
        });
        const negatives = data.result_negative.map(value => (value === -1 ? 0 : value));
        
        // 주식 데이터
        
        const stockData = times.map((time, index) => ({
          x: time,
          y: data.result_present[index]
        }));
        // console.log(stockData);
        setSentimentSeries([{ name: '부정도 %', data: negatives }]);
        setStockSeries([{ name: '주식 가격', data: stockData }]);

        // 차트 옵션 설정
        setOptions(prevOptions => ({
            ...prevOptions,
            sentimentOptions: {
              ...prevOptions.sentimentOptions,
              xaxis: {
                ...prevOptions.sentimentOptions.xaxis,
                categories: times
              }
            },
            stockOptions: {
              ...prevOptions.stockOptions,
              xaxis: {
                ...prevOptions.stockOptions.xaxis,
                type: 'datetime'
              }
            }
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, [keywordText]);

  return (
    <div className='chart-background'>
      <div className='chart-container'>
        <div className='chart-title'><h2><strong>{keywordText}</strong> 시간별 부정률(%)</h2></div>
        <div className='chart-box'>
          <ReactApexChart options={options.sentimentOptions} series={sentimentSeries} type='line' height={350} />
        </div>
        
        <div className='chart-info'>
          <div className='chart-title'><h2>시세 정보</h2></div>
        </div>
          <div className='price-info-box'>
          <div className='stock-price'>현재가: <strong>53,300</strong></div>
          <div className='price-change'>전일대비: <span className='down'>-800</span></div>
          <div className='stock-info'>등락률: <span className='rate'>-1.48%</span></div>
          <div className='stock-info'>시가: <span className='open-price'>53,000</span></div>
          <div className='stock-info'>고가: <span className='high-price'>53,800</span></div>
          <div className='stock-info'>저가: <span className='low-price'>52,800</span></div>
          <div className='stock-info'>거래량: <span className='volume'>129,612</span></div>
          </div>
        <div className='chart-box'>
          <ReactApexChart options={options.stockOptions} series={stockSeries} type='area' height={350} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
