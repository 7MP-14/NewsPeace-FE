import {React, useState, useEffect} from "react";
import '../css/mypage.css';
import backimg from "../img/bg-masthead.jpg";
import icon2 from '../img/user.png'
import { Link } from "react-router-dom";
import Emailbutton from './sendEmail.js';


export default function Mypage(props) {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [keywords, setKeywords] = useState();
  const [emailNotice, setEmailNotice] = useState();
  const [smsNotice, setSmsNotice] = useState();

  const [scrap, setScrap] = useState();

  useEffect(() => {
    console.log(window.localStorage.getItem('token'))

    getProfile();
  }, []);

  const getProfile=()=>{
    const token = `${window.localStorage.getItem('token')}`;
    console.log(token);
    fetch("http://3.34.92.70/api/profile/",{
      method:'GET',
      headers:{
        'Content-Type':'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함

      },
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setName(res.name);
      setEmail(res.email);
      setPhoneNumber(res.phone_number);
      setEmailNotice(res.emailNotice);
      setSmsNotice(res.smsNotice);
      setKeywords(res.keywords);
    })
  }

//   const onEmailChange = (email) => {
//     setEmail(email);
//   };

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

                        <h2 className="profile_name">{name} 님, 안녕하세요!</h2>
                    </div>
                </div>
                <div className="userinfo_section">
                    <h3 className="section_title">개인정보</h3>
                        <p>전화번호 : {phoneNumber}</p>
                        <p>이메일 :{email}</p>
                        {/* 기타 관심 키워드 */}
                    
                </div>
                <div className="keyword_section">
                    <h3 className="section_title">관심 키워드</h3>
                    <div className="keywords">
                        <p>{keywords}</p>
                        {emailNotice && smsNotice && (
                            <p>💕 이메일과 문자로 알림을 받겠습니다. ❤️</p>
                        )}

                        {emailNotice && !smsNotice && (
                            <span>
                                <p>💕 이메일로 알림을 받겠습니다. ❤️</p>
                                <Emailbutton email={email}></Emailbutton>
                            </span>
                            
                        )}

                        {!emailNotice && smsNotice && (
                            <p>💕 문자로 알림을 받겠습니다. ❤️</p>
                        )}

                        {!emailNotice && !smsNotice && (
                            <p>알림을 받지 않습니다. 😢</p>
                        )}
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