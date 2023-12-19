import React from "react";
import '../css/mypage.css';
import backimg from "../img/bg-masthead.jpg";
import icon1 from '../img/z.png';
import icon2 from '../img/user.png'
import { Link } from "react-router-dom";


export default function Mypage(props) {
  // 스크랩된 기사 예시 데이터
  const scrappedArticles = [
    { id: 1, title: "기사 제목 1", description: "기사 내용 요약 1", image: "image_url_1" },
    // ... 다른 기사 데이터
  ];

  return (
    <div className="mypage_body" style={{ backgroundImage: `url(${backimg})` }}>
        <div className="mypage_container">
            <div className="leftbox">
                <div className="profile_section">
                    <div className="profile_info">
                        <img src={icon2} className="profile_photo" alt="Profile"/>

                        <h2 className="profile_name">정솔 님, 안녕하세요!</h2>
                    </div>
                </div>
                <div className="userinfo_section">
                    <h3 className="section_title">개인정보</h3>
                        <p>전화번호 : 010-0000-0000</p>
                        <p>이메일 : bohomi1995j@gmail.com</p>
                        {/* 기타 관심 키워드 */}
                    
                </div>
                <div className="keyword_section">
                    <h3 className="section_title">관심 키워드</h3>
                    <div className="keywords">
                        <p>정치, 경제</p>
                        {/* <span className="keyword">정치</span>
                        <span className="keyword">경제</span> */}
                        {/* 기타 관심 키워드 */}

                        <p>💕 관심 키워드에 대한 알림을 받겠습니다.❤️</p>
 
                    </div>
                </div>
                <div className="survey_section">
                    {/* <button>수정</button> */}
                    <Link to='/editPage' className="linkbutton">수정</Link>
                    <button>회원탈퇴</button>
                </div>
            </div>
            <div className="rightbox">
                <div className="scrap_section">
                    <h3 className="section_title_scrap">스크랩 기사</h3>
                    <div className="scrap_articles">
                        {scrappedArticles.map(article => (
                        <div className="article_card" key={article.id}>
                            {/* <img src={article.image} alt={article.title} className="article_image" /> */}
                            <div className="article_content">
                            <h4 className="article_title">{article.title}</h4>
                            {/* <p className="article_description">{article.description}</p> */}
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="scrap_articles">
                        {scrappedArticles.map(article => (
                        <div className="article_card" key={article.id}>
                            {/* <img src={article.image} alt={article.title} className="article_image" /> */}
                            <div className="article_content">
                            <h4 className="article_title">{article.title}</h4>
                            {/* <p className="article_description">{article.description}</p> */}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  );
}