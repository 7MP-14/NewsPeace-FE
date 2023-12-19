import {React, useState} from 'react';
// import '../css/home.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import icon1 from '../img/흰돋보기.png';
import icon2 from '../img/의사결정.png';
import icon3 from '../img/효율성.png';
import icon4 from '../img/전략2.png';
import icon5 from '../img/정장.jpg';
import icon6 from '../img/의사소통.jpg';
import icon7 from '../img/업무.jpg';


const Home=()=>{
    const [checkedItems, setCheckedItems] = useState([]);
    const [keyword, setKeyword] = useState();
    
    const checkedItemHandler = (category) => {
      // Toggle the selection state for the clicked category
      setCheckedItems((prevSelected) => {
        if (prevSelected.includes(category)) {
          return prevSelected.filter((one) => one !== category);
        } else {
          return [...prevSelected, category];
        }
      });
    };

    const handleKeywordChange = (event) => {
        // Update the searchWord state when the input value changes
        setKeyword(event.target.value);
      };


  const submit=(code,isChecked)=>{
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/survey/surveypage/',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        survey:checkedItems,
        keyword:keyword, // Include the searchWord in the request body
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log('성공')
    })
    console.log(checkedItems);
    window.location.replace('/result')
  }



    return (  
    <>
        <header className="masthead">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                            {/* <h1 className="mb-5"></h1> */}
                            <div className="form-subscribe" id="contactForm" >
                                <div className="row">
                                    <div className="col">
                                        <input className="form-control form-control-lg" id="keyword" type="text" value={keyword} onChange={handleKeywordChange} placeholder="관심 있는 키워드를 입력하세요."  />
                                        <div className='categorybtn'>
                                            <button className={`checkbtn ${checkedItems.includes('정치') ? 'selected' : ''}`} onClick={() => checkedItemHandler('정치')}>정치</button>
                                            <button className={`checkbtn ${checkedItems.includes('경제') ? 'selected' : ''}`} onClick={() => checkedItemHandler('경제')}>경제</button>
                                            <button className={`checkbtn ${checkedItems.includes('사회') ? 'selected' : ''}`} onClick={() => checkedItemHandler('사회')}>사회</button>
                                            <button className={`checkbtn ${checkedItems.includes('문화') ? 'selected' : ''}`} onClick={() => checkedItemHandler('문화')}>문화</button>
                                            <button className={`checkbtn ${checkedItems.includes('국제') ? 'selected' : ''}`} onClick={() => checkedItemHandler('국제')}>국제</button>
                                            <button className={`checkbtn ${checkedItems.includes('IT') ? 'selected' : ''}`} onClick={() => checkedItemHandler('IT')}>IT</button>
                                            <button className={`checkbtn ${checkedItems.includes('연예') ? 'selected' : ''}`} onClick={() => checkedItemHandler('연예')}>연예</button>
                                            <button className={`checkbtn ${checkedItems.includes('스포츠') ? 'selected' : ''}`} onClick={() => checkedItemHandler('스포츠')}>스포츠</button>
                                        </div>
                                        <div className='hottopic'>
                                            <p>인기 검색어  :  </p> <p className='keyword'>정솔</p>
                                        </div>
                                    </div>
                                    {/* <div class="col-auto"><button class="btn btn-primary btn-lg disabled" id="submitButton" type="submit"><img src={icon1} style={{width:'40px', height:'37px'}}></img></button></div> */}
                                    <div className="col-auto"><img src={icon1} style={{width:'40px', height:'37px'}} onClick={submit}></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section className="features-icons bg-light text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">

                            <div className="col-auto"><img src={icon2} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>의사결정 지원</h3>
                            <p className="lead mb-0">투자 의사결정 지원, 시장예측, 리스크 관리, 고객 서비스 향상</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">

                            <div className="col-auto"><img src={icon3} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>업무 효율성 향상</h3>
                            <p className="lead mb-0">이슈, 트렌드, 시장 조사와 분석 시간을 줄임으로써 업무 효율성 증가</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">

                            <div className="col-auto"><img src={icon4} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>전략적 대응</h3>
                            <p className="lead mb-0">기업, 정부 차원에의 부정인 뉴스에 대한 선제적인 대응 가능</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="showcase">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {/* <div className="col-lg-6 order-lg-2 text-white showcase-img" style={"background-image: url('assets/img/bg-showcase-1.jpg')"}></div> */}
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" ><img src={icon7} style={{width:'100%', height:'100%'}} ></img></div>

                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>의사결정 지원</h2>
                        <p className="lead mb-0">주식이나 기업 가치 분석, 특정 키워드 분석에 효과적으로 사용 가능, 기업에 대한 뉴스를 실시간으로 제공하기 때문에 사용자는 기업의 현재 상황을 빠르게 파악, 사용자는 기업의 성과와 함께, 기업의 사회적 책임과 윤리적 측면을 함께 고려 가능</p>
                    </div>
                </div>
                <div className="row g-0">
                    {/* <div className="col-lg-6 text-white showcase-img" style={"background-image: url('..//img/업무.jpg')"}></div> */}
                    <div className="col-lg-6 text-white showcase-img"><img src={icon6} style={{width:'100%', height:'100%'}} ></img></div>

                    {/* <div className="col-lg-6 text-white showcase-img"></div> */}

                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>업무효율성 향상</h2>
                        <p className="lead mb-0">협업이나 투자 시 특정 기업에 대한 분석, 자사 관련 기사의 동향 분석, 증권사와의 협업 및 투자사와의 협업 기대</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" ><img src={icon5} style={{width:'100%', height:'100%'}} ></img></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>전략적 대응</h2>
                        <p className="lead mb-0">부정적인 뉴스를 신속히 감지하여 정부 기관과 기업 간 신뢰와 협력을 강화, 기업 뿐만 아니라 정부와 정책에 대한 부정적인 의견을 식별하여 선제적 대응 및 더 나은 해결 방안을 모색, 특정 인물의 현재 여론을 모니터링</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="testimonials text-center bg-light">
            <div className="container">
                <h2 className="mb-5">What people are saying...</h2>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src="assets/img/testimonials-1.jpg" alt="..." />
                            <h5>Margaret E.</h5>
                            <p className="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src="assets/img/testimonials-2.jpg" alt="..." />
                            <h5>Fred S.</h5>
                            <p className="font-weight-light mb-0">"Bootstrap is amazing. I've been using it to create lots of super nice landing pages."</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="img-fluid rounded-circle mb-3" src="assets/img/testimonials-3.jpg" alt="..." />
                            <h5>Sarah W.</h5>
                            <p className="font-weight-light mb-0">"Thanks so much for making these free resources available to us!"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Home;