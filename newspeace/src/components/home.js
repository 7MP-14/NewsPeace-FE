import {React, useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import first from '../img/first.png';
import second from '../img/second.png';
import qr from '../img/qr.png';
import left from '../img/left.png';
import right from '../img/right.png';
import kospi_close from '../img/kospi_close.png';
import arrow from '../img/화살표.png';
import kpilogo from '../img/kpilogo.png';
import Service from '../img/Service.png';
import News1 from '../img/경향신문.jpeg';
import people1 from '../img/people1.png';
import people2 from '../img/people2.jpg';
import people3 from '../img/people3.jpg';
import people4 from '../img/people4.png';
import people5 from '../img/people5.jpg';
import people6 from '../img/people6.png';
import people7 from '../img/people7.jpg';
import people8 from '../img/people8.png';
import Loading from './Loading.js';
import { CSSTransition } from 'react-transition-group';   // npm install react-transition-group

const Home=()=>{
  const [checkedItems, setCheckedItems] = useState([]);
  const [inputkeyword, setinputKeyword] = useState('');
  const [hotKeywords, setHotKeywords] = useState([]);
  const [kpi, setkpi_list] = useState([]);
  const [hot5Keywords, setHot5Keywords]=useState([]);
  const [hot5KeywordsInfo, setHot5KeywordsInfo]=useState([]);
  // const [currentHotKeywordIndex, setCurrentHotKeywordIndex] = useState(0);
  const [currentHot5KeywordIndex, setCurrentHot5KeywordIndex] = useState(0);
  // const [animationClass, setAnimationClass] = useState('keyword-animation-enter');
  const [loading, setLoading] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [hoveredKeyword, setHoveredKeyword] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const itemsPerPage = 10;
  const totalTabs = Math.ceil(Object.keys(kpi).length / itemsPerPage);
  const featuresRef = useRef(null);
  const scrollRef = useRef(null);
  //// 스크롤
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 400; // 스크롤 값 2450
      // 스크롤이 일정 이상 내려갔을 때 버튼 표시
      setShowScrollToTop(scrollTop > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤 적용
    });
  };
  
  /////


  // 도움말 상자 
  const [isHelpBoxOpen, setIsHelpBoxOpen] = useState(false);
  const toggleHelpBox = () => {
    setIsHelpBoxOpen(!isHelpBoxOpen);
  };
  ////////

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

  //검색어 FETCH 함수
  const submit=()=>{
    if (!inputkeyword.trim()) {
      window.alert('검색어를 입력해주세요.');
      return;
    }
    setLoading(true);
  
    fetch(`${apiUrl}/news/search/`, {
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
//인기검색어 GET FETCH 함수
const getHotKeyword=()=>{
  fetch(`${apiUrl}/hot/`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('실시간 검색어 가져오기 성공');
      console.log(res);
      setHotKeywords(res.hot_search_keyword);
      setHot5Keywords(res.hot_5_keyword);
      setHot5KeywordsInfo(res.hot_5_keyword_info);
    })
    .catch((error) => {
      console.error('에러:', error);
    });
}
useEffect(() => {
  getHotKeyword();
}, []);

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


  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const handlePrevClick = () => {
    setCurrentTab((prevTab) => (prevTab === 0 ? totalTabs - 1 : prevTab - 1));
  };

  const handleNextClick = () => {
    setCurrentTab((prevTab) => (prevTab === totalTabs - 1 ? 0 : prevTab + 1));
  };
  ///

  

  //실시간 키워드 검색 FETCH 함수
  const handleMainKeywordClick = (keyword) => {
    setHoveredKeyword(keyword);

    setLoading(true);

    fetch(`${apiUrl}/news/search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        keyword:keyword,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      setLoading(false);

      if (res.reply === false) {
        window.alert('해당하는 검색어에 대한 결과가 없습니다.');
        setinputKeyword('');
      } else {
        navigate('/result', { state: { responseData: res } });
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error('에러:', error);
    });
  };

  const handleKeywordClick = (keywordText) => {
    navigate(`/StockPage`, { state: { keywordText } });
  };

  //실시간 검색어 호버 함수
  // const handleKeywordMouseEnter = (keyword) => {
  //   // console.log(`Fetching news for keyword: ${keyword}`);
  //   setHoveredKeyword(keyword);
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const featuresSection = featuresSectionRef.current;
  //     const featuresSectionTop = featuresSection.offsetTop;
  //     const scrollThreshold = 400;

  //     // 현재 스크롤 위치
  //     const scrollY = window.scrollY;

  //     // 스크롤이 아래로 내려갔을 때
  //     if (scrollY > scrollThreshold && scrollY > featuresSectionTop) {
  //       // 특정 섹션으로 스크롤
  //       scrollToFeaturesSection();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // // 스크롤로 이동할 함수를 정의합니다.
 const scrollToFeaturesSection = () => {
    if (featuresRef.current) {
      window.scrollTo({
        top: featuresRef.current.offsetTop,
        behavior: 'smooth', // 부드러운 스크롤 적용
      });
    }
  };

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      let delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;

      let moveTop = window.scrollY;
      const elm = document.querySelectorAll("section");
      const elmCount = elm.length;
      const currentIndex = Array.from(elm).findIndex(el => el.getBoundingClientRect().top >= 0);

      // currentIndex가 올바른 범위 내에 있는지 확인
      if (currentIndex >= 0 && currentIndex < elmCount) {
        const currentSection = elm[currentIndex];
        // currentSection이 정상적으로 선택되었는지 확인
        if (currentSection) {
          // wheel down : move to next section
          if (delta < 0) {
            if (currentIndex !== elmCount - 1) {
              try {
                moveTop = window.pageYOffset + currentSection.nextElementSibling.getBoundingClientRect().top;
              } catch (e) {}
            }
          }
          // wheel up : move to previous section
          else {
            if (currentIndex !== 0) {
              try {
                // If the current section is not the 'home' section, move to the previous section
                if (currentSection.id !== "home") {
                  moveTop = window.pageYOffset + currentSection.previousElementSibling.getBoundingClientRect().top;
                } else {
                  // If the current section is the 'home' section, move to the top of the page
                  moveTop = 0;
                }
              } catch (e) {}
            }
          }

          window.scrollTo({ top: moveTop, left: 0, behavior: "smooth" });
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
    return (  
      <>

     {loading ? 
         ( //로딩이 참이면, 로딩 페이지로
         
         <Loading/>
       )
       :
       (// 코스피 rgba(255, 182, 193, 1)
        <>
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button"
          style={{
            opacity: showScrollToTop ? 1 : 0,
            backgroundColor: 'transparent',
            border: '2px solid rgba(10, 88, 202, 0.8)'
          }}
        >
        <img src={arrow} style={{width:'70%', height:'70%'}} alt="arrow" />
        </button>

        <button className='stockButton'
          onClick={toggleHelpBox}
          style={{
            width: '60px',
            height:'80px',
            position: 'fixed',
            bottom: '0.5rem',
            right: '2.5rem',
            zIndex: '9999',
            cursor: 'pointer',
            borderRadius: '78px',
            background: 'rgba(255, 255, 255, 0.6)',
            border: '2px solid rgba(10, 88, 202, 0.8)',
            font_weight: '800',
            color: '#146DF0',
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
                            <p key={key} style={{ display: 'flex', alignItems: 'center' }}  onClick={() => handleKeywordClick(value)}>
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
        <div className="blurred-background"
          style={{
            top: mousePosition.y - 40,
            left: mousePosition.x - 60,
          }}
        ></div>
        <div className='mainFirstDiv'>
          <div className='mediaCompany'>
            <p>언론사</p>
            <img src={News1} style={{width:"110px", height:"46px"}}></img>
            <hr style={{width:"46px", transform: "rotate(-90deg)"}}></hr>
            <img src={News1} style={{width:"110px", height:"46px"}}></img>
            <hr style={{width:"46px", transform: "rotate(-90deg)"}}></hr>
            <img src={News1} style={{width:"110px", height:"46px"}}></img>
            <hr style={{width:"46px", transform: "rotate(-90deg)"}}></hr>
            <img src={News1} style={{width:"110px", height:"46px"}}></img>
            <hr style={{width:"46px", transform: "rotate(-90deg)"}}></hr>
            <img src={News1} style={{width:"110px", height:"46px", marginRight:"30px"}}></img>
          </div>
          <div className="ani-size"> 
            <section id="home">
            <section ref={featuresRef} className="hotNewDiv">
              {/* <div className="hothot" style={{width:'70%'}}> */}
              <div className='hotkeywordsDiv'>
                <div className="titlediv">
                  <p >실시간 키워드</p>
                </div>
                <div className="hotkeyword" >
                  {/* 주요 키워드 표시 */}
                  {hot5Keywords.map((keyword, index) => (
                    <p
                      key={index}
                      style={{ fontWeight: index === currentHot5KeywordIndex ? 'bold' : 'normal', cursor: 'pointer'}}
                      onClick={() => {
                        setCurrentHot5KeywordIndex(index);
                        handleMainKeywordClick(keyword);
                      }}
                      // onMouseEnter={() => handleKeywordMouseEnter(keyword)}
                    >
                      {index + 1}. {keyword}
                    </p>
                  ))}
                </div>
                
              </div>
                {/* <hr style={{width:"364px", transform: "rotate(-90deg)", top:"1000px"}}></hr> */}

                <div className="hotnews">
                  {/* 왼쪽에 이미지와 제목 출력 */}
                  <div className='hotNewsTitle'>
                    <p>실시간 "{hoveredKeyword || hot5Keywords[currentHot5KeywordIndex]}" 뉴스</p>
                  </div>
                  <div className='newsDIv'>
                    <div className="left-panel">
                      {hot5KeywordsInfo[hoveredKeyword || hot5Keywords[currentHot5KeywordIndex]] ? (
                        hot5KeywordsInfo[hoveredKeyword || hot5Keywords[currentHot5KeywordIndex]].map((item, index) => (
                          <div key={index} className={`keyword ${index === 0 ? 'bold' : ''}`}>
                            {index === 0 ? (
                              <div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                  <img src={item.img} alt={item.title} />
                                </a>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                  <p style={{ fontWeight: 'bold' }} className='newstitle'>{item.title}</p>
                                </a>
                              </div>
                            ) : null}
                          </div>
                        ))
                      ) : (
                        <p>해당 키워드에 대한 뉴스가 없습니다.</p>
                      )}
                    </div>
                    
                    {/* 오른쪽에 제목만 4개 출력 */}
                    <div className="right-panel">
                      {hot5KeywordsInfo[hoveredKeyword || hot5Keywords[currentHot5KeywordIndex]] ? (
                        hot5KeywordsInfo[hoveredKeyword || hot5Keywords[currentHot5KeywordIndex]].map((item, index) => (
                          index > 0 ? (
                            <div key={index} className={`keyword ${index === 0 ? 'bold' : ''}`}>
                              <p
                                style={{ cursor: 'pointer', fontWeight: 'normal' }}
                                onMouseOver={(e) => {
                                  e.target.style.fontWeight = 'bold';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.fontWeight = 'normal';
                                }}
                                className='newstitle'
                              >
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                  {item.title}
                                </a>
                              </p>
                            </div>
                          ) : null
                        ))
                      ) : null}
                    </div>
                  </div>
                  </div>
                  
              {/* </div> */}
            </section>

            </section>
          </div>

          <div className="showcase"   style={{paddingTop:'2rem', paddingBottom:'2rem', height:"900px"}}>
            {/* <hr style={{marginRight:'15%', marginLeft:'15%', marginBottom:'5rem'}}></hr> */}
            <h2><b>Newspeace</b>는 어떤 서비스인가요 ? </h2>
            <div className="container-fluid p-0" style={{ width: '90%', margin: '0 auto', display: 'flex' }}>
              
              <div className="col-lg-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={Service} style={{ width: '70%', height: 'auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'}} alt="Service" />
              </div>

              <div className="col-lg-6" id='aboutus' style={{width:"569px"}}>
                <div className="showcase-text" style={{ width: '100%', height: 'auto' }}>
                    
                  <div className="feature">
                    <p className='smalltitle'>키워드 분석</p>
                    <p style={{ fontSize: '1.07rem',color: "#333333" }}>최근 일주일 동안의 뉴스기사를 수집하여 검색한 키워드에 대한 기사를 분석합니다.</p>
                  </div>

                  <div className="feature" >
                    <p className='smalltitle'>여론 분석</p>
                    <p style={{ fontSize: '1.07rem',color: "#333333" }}>AI 모델을 활용하여 각 기사의 감정분석을 수행하고 긍정과 부정의 비율을 제공합니다.</p>
                  </div>

                  <div className="feature" >
                    <p className='smalltitle'>주가 확인</p>
                    <p style={{ fontSize: '1.07rem', color: "#333333"}}>증권정보를 실시간으로 반영해서 분석 결과에 따른 주가 파악에 도움이 될 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chatbot text-center" style={{width:'1200px', margin: '0 auto', marginTop:"60px"}}>
            <div className="showphone" style={{width:"630px"}} >
              <img src={second} style={{ width: '30%', height: '100%', transition: 'transform 0.3s' }} alt="second"
                className="enlarge-on-hover"/>
              
              <img src={first} style={{ width: '30%', height: '100%', transition: 'transform 0.3s' }} alt="first"
                className="enlarge-on-hover"/>
            </div>

            <div className="image-and-heading" style={{width:"570px"}}>
              <h2 style={{marginBottom:"40px"}}>챗봇 서비스</h2>
              <p style={{ fontSize: '1.3rem' }}>카카오톡에서 <b>"뉴스피스(Newspeace)"</b> 채널 등록 후 서비스를 이용해보세요!</p>
              <p style={{ fontSize: '1rem',color: "#999999" }}>*사진을 확대하려면 마우스를 올려주세요.</p>
              <div style={{ flexDirection: 'column', alignItems: 'bottom', marginTop: '4rem' }}>
                <img src={qr} style={{ width: '15%', height: 'auto'}} alt="qr" className="qr-hover" />
                <p style={{ fontSize: '1rem'}}><b>[Newspeace 채널]</b></p>
              </div>
            </div>
          </div>
        
        {/* <section className="testimonials text-center bg-light">
          <div className="container"  ><hr></hr>
              <h2 className="mb-5" style={{marginTop:'4rem'}}>KT Aivle 4기 ❤️14조❤️</h2>
              <div className="row">
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people1} alt="..." />
                          <h5>고동연</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people2} alt="..." />
                          <h5>나창준</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people3} alt="..." />
                          <h5>심승헌</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people4} alt="..." />
                          <h5>온동헌</h5>
                      </div>
                  </div>
              </div><br></br>
              <div className="row">
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people5} alt="..." />
                          <h5>정솔</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people6} alt="..." />
                          <h5>정유진</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people7} alt="..." />
                          <h5>최자윤</h5>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img src={people8} alt="..." />
                          <h5>현지연</h5>
                      </div>
                  </div>
              </div>
          </div>
      </section> */}
      </div>
    </>
    )};
  </>
  );
};

export default Home;