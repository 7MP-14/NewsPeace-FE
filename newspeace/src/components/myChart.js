import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useLocation } from 'react-router-dom';
import '../css/myChart.css';

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
        type: 'datetime',
      },
      yaxis: {
        max: 100,
        min: 0
      },
      tooltip: {
        x: {
          format: 'dd MMM HH:mm' 
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
        type: 'datetime',
      },
      yaxis: {
        max: undefined,
        min: undefined
      },
      tooltip: {
        x: {
          format: 'dd MMM HH:mm'
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

        
        // 부정도 데이터 처리
        // const times = data.result_time.map(time => {
        //   const [date, timeOfDay] = time.split('T');
        //   const [year, month, day] = date.split('-');
        //   const [hours, minutes] = timeOfDay.split(':');
        //   return `${month}/${day} ${hours}:${minutes}`; // MM/DD HH:MM 형태로 반환
        // });

        const times = data.result_time.map(time => {
          const [date, timeOfDay] = time.split('T');
          const [hours, minutes] = timeOfDay.split(':');
          return `${hours}:${minutes}`; // HH:MM 형태로 반환
        });

        const negatives = data.result_negative.map(value => (value === -1 ? 0 : value));


      // // UTC 기준으로 현재 날짜의 장 시작 시간과 마감 시간을 계산하는 함수
      // const calculateMarketTimesUTC = () => {
      //   // 현재 날짜를 기준으로 하는 Date 객체 생성
      //   const now = new Date();
      //   const marketOpen = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)); // 오전 9시 KST는 UTC의 0시
      //   const marketClose = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 6, 30, 0)); // 오후 3시 30분 KST는 UTC의 6시 30분

      //   return {
      //     marketOpenTime: marketOpen.getTime(),
      //     marketCloseTime: marketClose.getTime()
      //   };
      // };
        
        
        
      if (data.result_present) {
        // `stockData` 배열을 생성할 때, 각 데이터 포인트의 실제 타임스탬프로 `x` 값을 설정합니다.
        const stockData = data.result_time.map((time, index) => {
          const timestamp = new Date(time).getTime(); // `time` 문자열을 파싱하여 타임스탬프를 얻습니다.
          return {
            x: timestamp,
            y: data.result_present[index]
          };
        }).sort((a, b) => a.x - b.x);

        // // 장 시작과 마감 시간 계산
        // const { marketOpenTime, marketCloseTime } = calculateMarketTimesUTC();
      

        setSentimentSeries([{ name: '부정도', data: negatives }]);
      
       

        // 현재가, 전일 종가, 변동 금액, 변동률 계산
        setCurrentPrice(data.result_present[data.result_present.length - 1]);
        setPreviousClose(data.result_open);
        const change = data.result_present[data.result_present.length - 1] - data.result_open;
        setChange(data.result_dod);
        setChangePercent((change / data.result_open) * 100);
        setOpenPrice(data.result_open);
        setHighPrice(data.result_high);
        setLowPrice(data.result_low);
       
        
        setStockSeries([{ name: '주식 가격', data: stockData }]);

        
        setOptions(prevOptions => ({
          ...prevOptions,
          
          sentimentOptions: {
            ...prevOptions.sentimentOptions,
            xaxis: {
              ...prevOptions.sentimentOptions.xaxis,
              categories: data.result_time // 변환된 시간 데이터 설정
            }
          },

      
          stockOptions: {
            ...prevOptions.stockOptions,
            xaxis: {
              type: 'datetime'
            }
          
            // annotations: {
            //   xaxis: [
            //     {
            //       x: marketOpenTime,
            //       borderColor: '#00E396',
            //       label: {
            //         text: '장 시작',
            //         style: {
            //           color: '#fff',
            //           background: '#00E396',
            //         },
            //       },
            //     },
            //     {
            //       x: marketCloseTime,
            //       borderColor: '#FF4560',
            //       label: {
            //         text: '장 마감',
            //         style: {
            //           color: '#fff',
            //           background: '#FF4560',
            //         },
            //       },
            //     },
            //   ]
            // }
          
          }
        }));
      
      }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, [keywordText]);

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