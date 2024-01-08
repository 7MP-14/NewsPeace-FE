import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation } from 'react-router-dom';
import '../css/myChart.css';
import backimg from "../img/bg-masthead.jpg";


const LineChart = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드'; 
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
        max: 100,
        min: 0
      },
      tooltip: {
        x: {
          format: 'HH:mm' 
        },
        
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
        type: 'category',
        
      },
      yaxis: {
        max: undefined,
        min: undefined
      },
      tooltip: {
        x: {
          format: 'HH:mm'
        }
      },
      
    }
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // API 호출 코드
        const response = await fetch(`${apiUrl}/graph/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({ name: keywordText })
          
        });
        const data = await response.json();
        console.log(data);

        
        // 시간 데이터를 HH:MM 형식으로 변환하여 차트 카테고리에 사용
        const categories = data.result_time.map(time => {
          const timePart = time.split('T')[1];
          const [hours,] = timePart.split(':');
          return `${hours}`; // 변환된 시간 문자열
        });
        
        // 부정도 차트 데이터 설정
        const negatives = data.result_negative.map(value => (value === -1 ? 0 : value));
        setSentimentSeries([{ name: '부정도', data: negatives }]);


        // 주식 차트 데이터 설정
        const stockData = data.result_present.map((value, index) => ({
          x: new Date(data.result_time[index]).getTime(), // 변환된 날짜-시간 문자열
          y: data.result_present[index]
        }));
        setStockSeries([{ name: '주식 가격', data: stockData }]);

        // 현재가, 전일 종가, 변동 금액, 변동률 계산
        setCurrentPrice(data.result_present[data.result_present.length - 1]);
        setPreviousClose(data.result_open);
        const change = data.result_present[data.result_present.length - 1] - data.result_open;
        setChange(data.result_dod);
        setChangePercent((change / data.result_open) * 100);
        setOpenPrice(data.result_open);
        setHighPrice(data.result_high);
        setLowPrice(data.result_low);

        
        setOptions(prevOptions => ({
          ...prevOptions,
          
          sentimentOptions: {
            ...prevOptions.sentimentOptions,
            xaxis: {
              ...prevOptions.sentimentOptions.xaxis,
              type: 'category',
              categories: categories,
            },
            tooltip: {
              x: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                  const originalTime = data.result_time[dataPointIndex];
                  const [datePart, timePart] = originalTime.split('T');
                  const [year, month, day] = datePart.split('-');
                  const [hours, minutes] = timePart.split(':');
                  return `${month}/${day} ${hours}:${minutes}`; 
                }
              }
            },
          },

      
          stockOptions: {
            ...prevOptions.stockOptions,
            xaxis: {
              ...prevOptions.stockOptions.xaxis,
              type: 'category',
              categories: categories,
              // labels: {
              //   formatter: function (value) {
              //     return new Date(value).getHours(); // 타임스탬프를 시간(HH) 형식으로 변환
              //   }
              // }
            },
            tooltip: {
              x: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                  const originalTime = data.result_time[dataPointIndex];
                  const [datePart, timePart] = originalTime.split('T');
                  const [year, month, day] = datePart.split('-');
                  const [hours, minutes] = timePart.split(':');
                  return `${month}/${day} ${hours}:${minutes}`; 
                }
              }
            },
          }
        }));
      
      //}
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, [apiUrl, keywordText]); // 의존성 배열에 apiUrl 추가

  return (
    <div className='chart-background'>
      <div className='chart-container'>
        <div className='chart-title'><h2><strong className="keyword-text">{keywordText}</strong> 시간별 추이</h2></div>
        <div className='chart-box'>
          <ReactApexChart options={options.sentimentOptions} series={sentimentSeries} type='line' height={350} />
        </div>
        
        {/* 주식 차트 또는 메시지 표시 */}
        {stockSeries.length > 0 ? (
          <>
        <div className='chart-info'>
          <div className='chart-title'><h2>시세 정보</h2></div>
        </div>
          <div className='price-info-box'>
           <div className='stock-price'>현재가: <strong>{currentPrice ? currentPrice.toLocaleString() : '로딩 중...'}</strong></div>
           <div className='price-change'>전일대비: <span className={change >= 0 ? 'up' : 'down'}>{change ? `${Math.abs(change)}` : '...'}</span></div>
           <div className='stock-info'>등락률: <span className={changePercent >= 0 ? 'rate-up' : 'rate-down'}>{changePercent ? `${changePercent.toFixed(2)}%` : '...'}</span></div>
           <div className='stock-info'>시가: <span className='open-price'>{openPrice ? `${parseInt(openPrice, 10).toLocaleString()}` : '...'}</span></div>
           <div className='stock-info'>고가: <span className='high-price'>{highPrice ? `${parseInt(highPrice, 10).toLocaleString()}` : '...'}</span></div>
           <div className='stock-info'>저가: <span className='low-price'>{lowPrice ? `${parseInt(lowPrice, 10).toLocaleString()}` : '...'}</span></div>
          </div>
        <div className='chart-box'>
          <ReactApexChart options={options.stockOptions} series={stockSeries} type='area' height={350} />
        </div>
      </>
      ) : (
        <div className='no-stock-data'>
            <h2>해당 기업 정보가 없습니다.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;