import {React, useEffect, useState} from 'react';
//import { useSpring, animated } from 'react-spring';

// import '../css/home.css';
// import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import first from '../img/first.png';
import second from '../img/second.png';
import chatbot from '../img/chatbot.png';
import qr from '../img/qr.png';
import icon1 from '../img/흰돋보기.png';
// import icon2 from '../img/의사결정.png';
// import icon3 from '../img/효율성.png';
// import icon4 from '../img/전략2.png';
//import icon5 from '../img/정장.jpg';
//import icon6 from '../img/의사소통.jpg';
//import icon7 from '../img/업무.jpg';
import Service from '../img/Service.png';
import people1 from '../img/people1.png';
import people2 from '../img/people2.jpg';
import people3 from '../img/people3.jpg';
import people4 from '../img/people4.png';
import people5 from '../img/people5.jpg';
import people6 from '../img/people6.png';
import people7 from '../img/people7.jpg';
import people8 from '../img/people8.png';

import Loading from './Loading.js';

const Home=()=>{

  // 투명도
  /////
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // 마우스 위치를 저장할 state 추가

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove); // 마우스 이동 이벤트 추가
    return () => {
      window.removeEventListener('mousemove', handleMouseMove); // 컴포넌트가 언마운트될 때 이벤트 제거
    };
  }, []);

  const [checkedItems, setCheckedItems] = useState([]);
  const [inputkeyword, setinputKeyword] = useState('');
  const [hotKeywords, setHotKeywords] = useState([]);
  const [currentHotKeywordIndex, setCurrentHotKeywordIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('keyword-animation-enter');
  const [loading, setLoading] = useState(false);
  // const [writetime, setWritetime]=useState();

  const navigate = useNavigate();

  // Enter로 검색
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submit(); 
    }
  };

  const checkedItemHandler = (category) => {
    setCheckedItems((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((one) => one !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handleKeywordChange = (event) => {
    setinputKeyword(event.target.value);
  };

  const submit=()=>{
    if (!inputkeyword.trim()) {
      window.alert('검색어를 입력해주세요.');
      return;
    }
  
    setLoading(true);
  
    fetch('http://newspeace.co.kr/news/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        keyword: inputkeyword,
        category: checkedItems,
      }),
    })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
  
        if (res.reply === false) {
          // 결과가 없는 경우
          window.alert('해당하는 검색어에 대한 결과가 없습니다.');
          setinputKeyword("");
        } else {
          // 결과가 있는 경우 페이지 이동
          navigate('/result', { state: { responseData: res, category: checkedItems } });
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('에러:', error);
      });
  }


  useEffect(() => {
    fetch('http://newspeace.co.kr/hot/', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('성공');
        console.log(res.hot_keyword);
        setHotKeywords(res.hot_keyword);
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 먼저 애니메이션 클래스를 제거
      setAnimationClass('');
      // 약간의 지연 후에 애니메이션 클래스를 다시 적용
      setTimeout(() => {
        setAnimationClass('keyword-animation-enter');
        setCurrentHotKeywordIndex(prevIndex => (prevIndex + 1) % hotKeywords.length);
      }, 100);
    }, 2000); // 4초마다 키워드 업데이트

    return () => clearInterval(intervalId);
  }, [hotKeywords.length, currentHotKeywordIndex]);

  const hotkeywordsubmit=()=>{
    setLoading(true);

    fetch('http://newspeace.co.kr/news/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        keyword: hotKeywords[currentHotKeywordIndex], // 선택된 핫 키워드 사용
        // category: checkedItems,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('성공');
        console.log(res);
        setLoading(false);
        navigate('/result', { state: { responseData: res } });
      })
      .catch(error => {
        console.error('에러:', error);
      });
  }
    return (  
      <>

     {loading ? 
         ( //로딩이 참이면, 로딩 페이지로
         <Loading/>
       )
       :
       (
        <>
        <div
          className="blurred-background"
          style={{
            width: '160px',
            height: '160px',  
            borderRadius: '50%',
            background: '#2D78EF',    // #1774D0
            position: 'fixed',
            top: mousePosition.y - 40,
            left: mousePosition.x - 60,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        ></div>
        
        <div className="ani-size"> 
          <header className="masthead" >
            <div className="container position-relative">
              <div className="row justify-content-center">
                <div className="col-xl-6">
                  <div className="text-center text-white">
                    <div className="form-subscribe" id="contactForm">
                      <div className="row">
                        <div className="col">
                          <input
                            className="form-control form-control-lg"
                            id="keyword"
                            type="text"
                            value={inputkeyword}
                            onChange={handleKeywordChange}
                            onKeyDown={handleKeyPress}
                            placeholder="관심 있는 키워드를 입력하세요."
                          />
                          <div className="categorybtn">
                              <button className={`checkbtn ${checkedItems.includes('정치') ? 'selected' : ''}`} onClick={() => checkedItemHandler('정치')}>정치</button>
                              <button className={`checkbtn ${checkedItems.includes('경제') ? 'selected' : ''}`} onClick={() => checkedItemHandler('경제')}>경제</button>
                              <button className={`checkbtn ${checkedItems.includes('사회') ? 'selected' : ''}`} onClick={() => checkedItemHandler('사회')}>사회</button>
                              <button className={`checkbtn ${checkedItems.includes('문화') ? 'selected' : ''}`} onClick={() => checkedItemHandler('문화')}>문화</button>
                              {/* <button className={`checkbtn ${checkedItems.includes('국제') ? 'selected' : ''}`} onClick={() => checkedItemHandler('국제')}>국제</button> */}
                              <button className={`checkbtn ${checkedItems.includes('IT') ? 'selected' : ''}`} onClick={() => checkedItemHandler('IT')}>IT</button>
                              <button className={`checkbtn ${checkedItems.includes('연예') ? 'selected' : ''}`} onClick={() => checkedItemHandler('연예')}>연예</button>
                              <button className={`checkbtn ${checkedItems.includes('스포츠') ? 'selected' : ''}`} onClick={() => checkedItemHandler('스포츠')}>스포츠</button>

                          </div>
                          
                          <div className="hottopic">
                            <div className="label-container">
                              <p className="label">인기 검색어:</p>
                            </div>
                          <div className="keyword-container">
                            {hotKeywords.length > 0 &&
                              <p className={`keyword ${animationClass}`} style={{cursor: 'pointer'}} onClick={() => hotkeywordsubmit(hotKeywords[currentHotKeywordIndex])} >{currentHotKeywordIndex + 1}. {hotKeywords[currentHotKeywordIndex]}</p>
                            }
                          </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <img src={icon1} style={{ width: '40px', height: '37px', cursor: 'pointer'}} onClick={submit} alt="search icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <hr></hr>
          <div className="showcase"  style={{paddingTop:'2rem'}}>
            <div className="container-fluid p-0" style={{ width: '90%', margin: '0 auto', display: 'flex' }}>
              <div className="col-lg-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={Service} style={{ width: '70%', height: 'auto' }} alt="Service" />
              </div>

              <div className="col-lg-6">
                <div className="showcase-text" style={{ width: '100%', height: 'auto' }}>
                  <h2><b>NewsPeace</b>는 어떤 서비스인가요 ? </h2>  
                  <div className="feature" style={{ marginTop: '5rem' }}>
                    <h3>일주일 단위 기사 데이터 수집</h3>
                    <p style={{ fontSize: '1.07rem' }}>최근 일주일 동안의 뉴스기사를 수집하여 검색한 키워드에 대한 기사를 분석합니다.</p>
                  </div>

                  <div className="feature" style={{ marginTop: '3rem' }}>
                    <h3>뉴스기사 별 긍정, 부정률 분석</h3>
                    <p style={{ fontSize: '1.07rem' }}>AI 모델을 활용하여 각 기사의 감정분석을 수행하고 긍정과 부정의 비율을 제공합니다.</p>
                  </div>

                  <div className="feature" style={{ marginTop: '3rem' }}>
                    <h3>실시간 주가 정보 확인</h3>
                    <p style={{ fontSize: '1.07rem' }}>증권정보를 실시간으로 반영해서 분석 결과에 따른 주가 파악에 도움이 될 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="chatbot text-center" style={{width:'70%', margin: '0 auto'}}>
            <div className="image-and-heading">
              <hr></hr>
              <h2><img src={chatbot} style={{ width: '4%', height: '10%', paddingTop:'2rem'}} alt="chatbot" />
              챗봇 서비스
              </h2>
            </div>
            <p style={{ fontSize: '1.2rem' }}>카카오톡 ➡️ <b>"뉴스피스(Newspeace)"</b> 채널 등록 후 서비스를 이용해보세요!</p>
            <p style={{ fontSize: '1.0rem' }}>🐶사진을 확대하려면 마우스를 올려주세요.🐶</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'3rem', marginBottom:'4rem'}}>
              <img
                src={second}
                style={{ width: '15%', height: '20%', margin: '0 4rem', transition: 'transform 0.3s' }}
                alt="second"
                className="enlarge-on-hover"
              />
              <img
                src={first}
                style={{ width: '15%', height: '20%', margin: '0 4rem', transition: 'transform 0.3s' }}
                alt="first"
                className="enlarge-on-hover"
              />
            </div>
            <img src={qr} style={{ width: '5%', height: '5%'}} alt="qr" className="qr-hover"/>
            <p style={{ fontSize: '0.8rem', marginBottom:'3rem'}}>[QR코드]</p>
            
          </div>


                            
          <div className="testimonials text-center">
            <div className="container" ><hr></hr>
                <h2 className="mb-5" style={{marginTop:'4rem'}}>KT Aivle 4기 ❤️14조❤️</h2>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people1} alt="..." />
                            <h5>고동연</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 1"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people2} alt="..." />
                            <h5>나창준</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 2"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people3} alt="..." />
                            <h5>심승헌</h5>
                            {/* <p className="font-weight-light mb-0">"팀장"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people4} alt="..." />
                            <h5>온동헌</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 4"</p> */}
                        </div>
                    </div>
                </div><br></br>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people5} alt="..." />
                            <h5>정솔</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 5"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people6} alt="..." />
                            <h5>정유진</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 6"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people7} alt="..." />
                            <h5>최자윤</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 7"</p> */}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img src={people8} alt="..." />
                            <h5>현지연</h5>
                            {/* <p className="font-weight-light mb-0">"멤버 8"</p> */}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
       )}
      </>
    );
  };

export default Home;