import { React, useState, useEffect } from "react";
import '../css/mypage.css';
import backimg from "../img/bg-masthead.jpg";
import icon2 from '../img/user.png'
import { Link } from "react-router-dom";
import Emailbutton from './sendEmail.js';

export default function Mypage(props) {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [keywords, setKeywords] = useState([]);
  const [emailNotice, setEmailNotice] = useState();
  const [smsNotice, setSmsNotice] = useState();

  const [scrap, setScrap] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userId = `${window.localStorage.getItem('user_id')}`
    fetch(`http://3.34.92.70/api/profile/${userId}/`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setName(res.name);
        setEmail(res.email);
        setPhoneNumber(res.phone_number);
        setEmailNotice(res.emailNotice);
        setSmsNotice(res.smsNotice);
        setKeywords(res.keywords);
      })
  }

  return (
    <div className="mypage_body" style={{ backgroundImage: `url(${backimg})` }}>
      <div className="mypage_container">
        <div className="leftbox">
          <div className="profile_section">
            <div className="profile_info">
              <img src={icon2} className="profile_photo" alt="Profile" />
              <h2 className="profile_name">{name} 님, 안녕하세요!</h2>
            </div>
          </div>
          <div className="userinfo_section">
            <h3 className="section_title">개인정보</h3>
            <p>전화번호 : {phoneNumber}</p>
            <p>이메일 : {email}</p>
          </div>
          <div className="keyword_section">
            <h3 className="section_title">관심 키워드</h3>
            <div className="keywords">
            {keywords && keywords.length > 0 ? (
                keywords.map(keyword => (
                <p key={keyword.id}>{keyword.keyword_text}</p>
                ))
            ) : (
                <p>키워드 없음</p>
            )}
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
            {/* Edit 페이지로 데이터 전달하는 Link */}
            {/* <Link to={`/editPage?name=${name}&email=${email}&phoneNumber=${phoneNumber}&keywords=${keywords}&emailNotice=${emailNotice}&smsNotice=${smsNotice}`} className="linkbutton">수정</Link> */}
            <Link
                to={`/editPage?name=${name}&email=${email}&phoneNumber=${phoneNumber}&keywords=${keywords.map(keyword => keyword.keyword_text).join(',')}&emailNotice=${emailNotice}&smsNotice=${smsNotice}`}
                className="linkbutton"
                >
                수정
                </Link>
            <button>회원탈퇴</button>
          </div>
        </div>
        {/* <div className="rightbox">
          <div className="scrap_section">
            <h3 className="section_title_scrap">스크랩 기사</h3>
            <div className="scrap_articles">
              scrappedArticles map 동일
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
