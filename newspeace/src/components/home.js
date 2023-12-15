import React from 'react';
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
    return (  
    <>
        <header class="masthead">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="text-center text-white">
                            {/* <h1 class="mb-5"></h1> */}
                            <form class="form-subscribe" id="contactForm" data-sb-form-api-token="API_TOKEN">
                                <div class="row">
                                    <div class="col">
                                        <input class="form-control form-control-lg" id="keyword" type="keyword" placeholder="검색어를 입력하세요." data-sb-validations="required,keyword" />
                                        <div className='categorybtn'>
                                            <button>정치</button>
                                            <button>경제</button>
                                            <button>사회</button>
                                            <button>문화</button>
                                            <button>국제</button>
                                            <button>IT</button>
                                            <button>연예</button>
                                            <button>스포츠</button>
                                        </div>
                                        <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                        <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                        <div className='hottopic'>
                                            <p>인기 검색어  :  </p> <p className='keyword'>정솔</p>
                                        </div>
                                    </div>
                                    {/* <div class="col-auto"><button class="btn btn-primary btn-lg disabled" id="submitButton" type="submit"><img src={icon1} style={{width:'40px', height:'37px'}}></img></button></div> */}
                                    <div class="col-auto"><img src={icon1} style={{width:'40px', height:'37px'}}></img></div>
                                </div>

                                <div class="d-none" id="submitSuccessMessage">
                                    <div class="text-center mb-3">
                                        <div class="fw-bolder">Form submission successful!</div>
                                        <p>To activate this form, sign up at</p>
                                        <a class="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <section class="features-icons bg-light text-center">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">

                            <div class="col-auto"><img src={icon2} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>의사결정 지원</h3>
                            <p class="lead mb-0">투자 의사결정 지원, 시장예측, 리스크 관리, 고객 서비스 향상</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">

                            <div class="col-auto"><img src={icon3} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>업무 효율성 향상</h3>
                            <p class="lead mb-0">이슈, 트렌드, 시장 조사와 분석 시간을 줄임으로써 업무 효율성 증가</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">

                            <div class="col-auto"><img src={icon4} style={{width:'150px', height:'150px'}}></img></div>
                            <h3>전략적 대응</h3>
                            <p class="lead mb-0">기업, 정부 차원에의 부정인 뉴스에 대한 선제적인 대응 가능</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="showcase">
            <div class="container-fluid p-0">
                <div class="row g-0">
                    {/* <div class="col-lg-6 order-lg-2 text-white showcase-img" style={"background-image: url('assets/img/bg-showcase-1.jpg')"}></div> */}
                    <div class="col-lg-6 order-lg-2 text-white showcase-img" ><img src={icon7} style={{width:'100%', height:'100%'}} ></img></div>

                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>의사결정 지원</h2>
                        <p class="lead mb-0">주식이나 기업 가치 분석, 특정 키워드 분석에 효과적으로 사용 가능, 기업에 대한 뉴스를 실시간으로 제공하기 때문에 사용자는 기업의 현재 상황을 빠르게 파악, 사용자는 기업의 성과와 함께, 기업의 사회적 책임과 윤리적 측면을 함께 고려 가능</p>
                    </div>
                </div>
                <div class="row g-0">
                    {/* <div class="col-lg-6 text-white showcase-img" style={"background-image: url('..//img/업무.jpg')"}></div> */}
                    <div class="col-lg-6 text-white showcase-img"><img src={icon6} style={{width:'100%', height:'100%'}} ></img></div>

                    {/* <div class="col-lg-6 text-white showcase-img"></div> */}

                    <div class="col-lg-6 my-auto showcase-text">
                        <h2>업무효율성 향상</h2>
                        <p class="lead mb-0">협업이나 투자 시 특정 기업에 대한 분석, 자사 관련 기사의 동향 분석, 증권사와의 협업 및 투자사와의 협업 기대</p>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-lg-6 order-lg-2 text-white showcase-img" ><img src={icon5} style={{width:'100%', height:'100%'}} ></img></div>
                    <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>전략적 대응</h2>
                        <p class="lead mb-0">부정적인 뉴스를 신속히 감지하여 정부 기관과 기업 간 신뢰와 협력을 강화, 기업 뿐만 아니라 정부와 정책에 대한 부정적인 의견을 식별하여 선제적 대응 및 더 나은 해결 방안을 모색, 특정 인물의 현재 여론을 모니터링</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="testimonials text-center bg-light">
            <div class="container">
                <h2 class="mb-5">What people are saying...</h2>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3" src="assets/img/testimonials-1.jpg" alt="..." />
                            <h5>Margaret E.</h5>
                            <p class="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3" src="assets/img/testimonials-2.jpg" alt="..." />
                            <h5>Fred S.</h5>
                            <p class="font-weight-light mb-0">"Bootstrap is amazing. I've been using it to create lots of super nice landing pages."</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img class="img-fluid rounded-circle mb-3" src="assets/img/testimonials-3.jpg" alt="..." />
                            <h5>Sarah W.</h5>
                            <p class="font-weight-light mb-0">"Thanks so much for making these free resources available to us!"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Home;