import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import '../css/StockPage.css';

//kpi
import kospi_close from '../img/kospi_close.png';
import kpilogo from '../img/kpilogo.png';
import { CSSTransition } from 'react-transition-group';   // npm install react-transition-group
import left from '../img/left.png';
import right from '../img/right.png';
import { useNavigate} from 'react-router-dom';
import { useLocation} from 'react-router-dom';

const StockPage = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const keywordText = location.state?.keywordText || '키워드'; 

  const [s_Open, stock_Open] = useState([]); // 시초가
  const [s_Close, stock_Close] = useState([]); // 종가
  const [s_High, stock_High] = useState([]); // 고가
  const [s_Low, stock_Low] = useState([]); // 저가
  const [s_Present, stock_Present] = useState([]); // 현재가
  const [s_dod, stock_dod] = useState([]); // 날짜
  const [s_Date, stock_Date] = useState([]); // 날짜

  const [stockData, setStockData] = useState([]); // Candlestick 차트 데이터


  // 코스피 버튼 리스트
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [kpi, setkpi_list] = useState([]);
  const totalTabs = Math.ceil(Object.keys(kpi).length / itemsPerPage);

  const [currentTab, setCurrentTab] = useState(0);
  const handlePrevClick = () => {
    setCurrentTab((prevTab) => (prevTab === 0 ? totalTabs - 1 : prevTab - 1));
  };
  const handleNextClick = () => {
    setCurrentTab((prevTab) => (prevTab === totalTabs - 1 ? 0 : prevTab + 1));
  };

  // 연결
  const handleKeywordClick = (keywordText) => {
    navigate(`/StockPage`, { state: { keywordText } });
  };

  // 추가 검색
  const Research = () => {
    navigate(`/`);
  };


  const [isHelpBoxOpen, setIsHelpBoxOpen] = useState(false);
  const toggleHelpBox = () => {
    setIsHelpBoxOpen(!isHelpBoxOpen);
  };

  //// KPI
  useEffect(() => {
    KPI200();
  }, []);

  const KPI200 = () => {
    fetch(`${apiUrl}/enterprise/`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('성공');
        console.log("zh",res);
        setkpi_list(res.return);
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  };
  ////////

////////////////////////// 주가데이터

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
      // console.log(data);

      //
      // 시가, 종가, 저가, 고가 데이터를 리스트로 저장
      // const openData = data.result_open;
      // const closeData = data.result_close;
      // const lowData = data.result_low;
      // const highData = data.result_high;
      //

      
      
      stock_High(data.result_high)
      stock_Low(data.result_low)
      stock_Open(data.result_open)
      stock_Present (data.result_present)  // 현재가
      stock_Close (data.result_close)

      const dodData = data.result_dod;
      stock_dod(dodData) //전일대비
      // 시간
      // API로부터 받아온 날짜를 'YYYY-MM-DD' 형식으로 변환
      const formattedDates = data.result_time.map(dateString => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      });
      stock_Date(formattedDates); // 변환된 날짜를 상태로 저장

      console.log("ㅁㅈ;ㅑㅐㅗㅇㅁ지ㅑㅕㅀㅈ미ㅐ려재재", data);

      console.log("시간", data.result_time);
      console.log("전일대비", data.result_dod);
      console.log("고가", data.result_high);
      console.log("저가", data.result_low);
      console.log("종가", data.result_close);
      console.log("시초가", data.result_open);
      console.log("현재가", data.result_present);
     

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    };
  fetchData();
}, [apiUrl, keywordText]); // 의존성 배열에 apiUrl 추가

////////////////////////////////////


  useEffect(() => {
      // Apache ECharts 연결 //
      const chartDom = document.getElementById('stock-chart');
      const echart = echarts.init(chartDom);
      ////////////////////////
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params) => {
          const [dateIndex, open, close, low, high] = params[0].data;
          const formattedDate = s_Date[dateIndex];
          const dod = s_dod[dateIndex]; // 특정 날짜의 전일대비 값 가져오기
          return (
            `<div style="text-align: left;">
              <p>날짜: ${formattedDate}</p>
              <p>시초가: ${open}</p>
              <p>종가: ${close}</p>
              <p>저가: ${low}</p>
              <p>고가: ${high}</p>
              <p>전일대비: ${dod}</p>
            </div>`
          );
        },
      },
      grid: {
      top: '5%',
      bottom: '5%',
      left: '10%',
      right: '10%',
      containLabel: true, // 레이블이 차트를 벗어나지 않도록 설정
      },
      xAxis: {
        data: s_Date,
      },
      dataZoom: [
        {
          type: 'inside', // 마우스 스크롤로 확대/축소
          start: 0,       // 확대 시작 위치 (0%)
          end: 100,       // 확대 종료 위치 (100%)
        },
        {
          type: 'slider', // 슬라이더로 확대/축소
          start: 0,
          end: 100,
          handleSize: '20%', // 슬라이더 핸들 크기 조절
          handleStyle: {
            color: '#FF7F27',   //#5470C6
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      yAxis: {
        min: function (value) {
          const minValue = Math.floor(value.min - (value.max - value.min) * 0.1);
          return Math.floor(minValue / 1000) * 1000; // 최소 값의 일의 자리를 0으로 만들어줌
        },
      },
      series: [    //차트 데이터는  [시초가, 종가, 저가, 고가] 순으로 정렬
        {
          type: 'candlestick',
          data: s_Date.map((date, index) => [
            s_Open[index],
            s_Close[index],
            s_Low[index],
            s_High[index],
          ]),
          barWidth: '60%',
        },
      ],
    };
    console.log("EChartsdwdwdwdwdwdwdwdw Option", option);
    echart.setOption(option);

    // 컴포넌트가 언마운트될 때 차트 정리
    return () => {
      echart.dispose();
    };
  }, [s_Date, s_Open, s_Close, s_Low, s_High, s_dod]); // s_Date가 변경될 때마다 실행
  
  return (
    <div className='stock-data'>
      <div className='stock-text' style={{marginLeft:'10rem', marginRight:'10rem'}}>
      <h1>{keywordText}  || 현재가 : {s_Present}</h1> <hr></hr><br></br>

    <p>긍부정도 그래프 표기 [time, 현재가, 부정도]</p>

    <p>일 별 그래프 표기 [time, 현재가]</p>
      
      {/* <p>전일대비 {s_dod}</p>
      <p>시초가 {s_Open} </p> 
      <p>고가 {s_High} </p>
      <p>저가 {s_Low}  </p>
      <p>종가 {s_Close}</p> */}
      </div>
        <div id="stock-chart" style={{ height: '500px'}}></div>
        <button
          onClick={Research}
          style={{
            width: '95px',
            position: 'fixed',
            bottom: '6rem',
            right: '1.5rem',
            zIndex: '9999',
            cursor: 'pointer',
            borderRadius: '10rem',
            backgroundColor: 'rgba(155, 176, 216, 1)',
          }}>
          메인 화면
        </button>

        <button
          onClick={toggleHelpBox}
          style={{
            width: '95px',
            position: 'fixed',
            bottom: '2rem',
            right: '1.5rem',
            zIndex: '9999',
            cursor: 'pointer',
            borderRadius: '10rem',
            backgroundColor: 'rgba(155, 176, 216, 1)',
          }}
        >
          주가 정보
        </button>


        
        <div className={`help-box ${isHelpBoxOpen ? 'show' : 'hide'}`} style={{width:'40rem', height:'41rem'}}>
        <img src={kospi_close} onClick={toggleHelpBox} style={{ width: '2rem', height: '2rem', marginLeft:'37rem', cursor: 'pointer' }}/>
          <div className='kpilist text-center ' style={{ overflowX: 'hidden'}}>
            {kpi && (
              <div className='mainkpi'>
                <h2 style={{ margin:'auto', width:'20rem'}}>
                  <img src={kpilogo} alt="kpilogo" style={{ width: '7rem', height: '4.5rem', marginRight:'1rem'}}></img>
                KOSPI 100</h2><hr style={{width:'18.5rem', margin:'auto'}}></hr>
                <br />
                <div className="kpibox" style={{ display: 'flex', overflowX: 'hidden', backgroundColor: 'white', width: '40%', margin: 'auto', paddingTop: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                  {Array.from({ length: totalTabs }, (_, tabIndex) => (
                    <CSSTransition
                      key={tabIndex}
                      in={currentTab === tabIndex}
                      timeout={300}
                      classNames="kpibox"
                      unmountOnExit
                    >
                      <div style={{ width: '100%', flex: '0 0 auto' }}>
                        {Object.entries(kpi)
                          .slice(tabIndex * itemsPerPage, (tabIndex + 1) * itemsPerPage)
                          .map(([key, value]) => (
                            <p key={key} style={{ display: 'flex', alignItems: 'center' }} onClick={() => {handleKeywordClick(value); toggleHelpBox();}}>
                              <span style={{textAlign: 'left', marginLeft:'2rem'}}>{Number(key)+1}</span>
                              <span
                                
                                style={{ flex: '1', textAlign: 'center', cursor: 'pointer', fontWeight: 'normal' }}
                                onMouseOver={(e) => { e.target.style.fontWeight = 'bold'; }}
                                onMouseOut={(e) => { e.target.style.fontWeight = 'normal'; }}>
                                {[value]}
                              </span>
                            </p>
                          ))}
                      </div>
                    </CSSTransition>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <img src={left} alt="Previous" onClick={handlePrevClick} style={{ width: '2rem', height: '2rem', marginRight: '10px', cursor: 'pointer' }}/>
                  <img src={right}  alt="Next" onClick={handleNextClick} style={{ width: '2rem', height: '2rem', cursor: 'pointer' }}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  {Array.from({ length: totalTabs }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: currentTab === index ? '#007BFF' : '#CCCCCC',
                        margin: '0 5px',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`blurred-background-help ${
            isHelpBoxOpen ? 'blurred-background-help-visible' : ''
          }`}
        ></div>

    </div> //기업없을때
  );
};

export default StockPage;
