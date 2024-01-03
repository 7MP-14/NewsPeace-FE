import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation } from 'react-router-dom';
import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";

const LineChart = () => {
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드'; // state가 정의되지 않은 경우 기본값 사용
  const [sentimentSeries, setSentimentSeries] = useState([]);
  const [stockSeries, setStockSeries] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [previousClose, setPreviousClose] = useState(null);
  const [change, setChange] = useState(null);
  const [changePercent, setChangePercent] = useState(null);
  const [openPrice, setOpenPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [lowPrice, setLowPrice] = useState(null);
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
        const response = await fetch('/mykeyword/', {
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
        
        // 데이터를 시간순으로 정렬
        const sortedData = data.result_time.map((time, index) => ({
          time: new Date(time).getTime(),
          price: data.result_present[index]
        })).sort((a, b) => a.time - b.time); // 시간순 정렬

        // 정렬된 데이터를 차트 데이터로 변환
        const stockData = sortedData.map(item => ({
          x: item.time,
          y: item.price
        }));

        // 현재가, 전일 종가, 변동 금액, 변동률 계산
        setCurrentPrice(data.result_present[data.result_present.length - 1]);
        setPreviousClose(data.result_open);
        const changeValue = data.result_present[data.result_present.length - 1] - data.result_open;
        setChange(changeValue);
        setChangePercent((changeValue / data.result_open) * 100);
        setOpenPrice(data.result_open);
        setHighPrice(data.result_high);
        setLowPrice(data.result_low);

        setSentimentSeries([{ name: '부정도 %', data: negatives }]);
        setStockSeries([{ name: '주식 가격', data: stockData }]);
        setOptions(prevOptions => ({
          ...prevOptions,
          stockOptions: {
            ...prevOptions.stockOptions,
            xaxis: {
              ...prevOptions.stockOptions.xaxis,
              type: 'datetime',
              categories: data.result_time // 주식 데이터의 시간 설정
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
           <div className='stock-price'>현재가: <strong>{currentPrice || '로딩 중...'}</strong></div>
          <div className='price-change'>전일대비: <span className={change >= 0 ? 'up' : 'down'}>{change || '...'}</span></div>
          <div className='stock-info'>등락률: <span className={changePercent >= 0 ? 'rate-up' : 'rate-down'}>{changePercent ? `${changePercent.toFixed(2)}%` : '...'}</span></div>
          <div className='stock-info'>시가: <span className='open-price'>{openPrice || '...'}</span></div>
          <div className='stock-info'>고가: <span className='high-price'>{highPrice || '...'}</span></div>
          <div className='stock-info'>저가: <span className='low-price'>{lowPrice || '...'}</span></div>
          </div>
        <div className='chart-box'>
          <ReactApexChart options={options.stockOptions} series={stockSeries} type='area' height={350} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
