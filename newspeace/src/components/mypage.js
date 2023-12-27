import { React, useState, useEffect } from "react";
import '../css/mypage.css';
import backimg from "../img/bg-masthead.jpg";
import icon2 from '../img/user.png'
import { Link, useNavigate } from "react-router-dom";
import EmailButton from './sendEmail.js';

export default function Mypage(props) {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [keywords, setKeywords] = useState([]);
  const [emailNotice, setEmailNotice] = useState();
  const [smsNotice, setSmsNotice] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSmsVerified, setIsSmsVerified] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userId = `${window.localStorage.getItem('user_id')}`
    fetch(`http://newspeace.co.kr/api/profile/${userId}/`, {
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
        setIsEmailVerified(res.is_email_verified);
      })
  }

  const navigate = useNavigate();

  const handleKeywordClick = (keywordText) => {
    // 다른 페이지로 이동하고자 하는 경우 navigate 사용
    navigate(`/myChart`, { state: { keywordText } });
    // navigate('/result', { state: { responseData: res } });
  };

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
            <p><strong>Phone : </strong>{phoneNumber}</p>
            <p><strong>Email : </strong>{email}</p>
            {emailNotice && smsNotice && !isEmailVerified && isSmsVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> email & sms</p>
                {/* 이메일 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
                {/* 이메일 인증이 필요하면 이곳에 문자 인증 버튼을 추가하세요 */}
              </span>
            )}

            {emailNotice && smsNotice && isEmailVerified && !isSmsVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> email & sms</p>
                {/* 문자 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
                {/* 문자 인증이 필요하면 이곳에 이메일 인증 버튼을 추가하세요 */}
              </span>
            )}

            {emailNotice && smsNotice && !isEmailVerified && !isSmsVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> email & sms</p>
                {/* 이메일 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
                {/* 문자 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
              </span>
            )}

            {emailNotice && !smsNotice && !isEmailVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> email</p>
                {/* 이메일 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
              </span>
            )}

            {emailNotice && !smsNotice && isEmailVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> email</p>
                {/* 이메일 인증 버튼 표시 */}
                <p className="noticealert2">이메일 인증이 완료됐습니다.</p>
              </span>
            )}

            {!emailNotice && smsNotice && !isSmsVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> sms</p>
                {/* 문자 인증 버튼 표시 */}
                <EmailButton email={email}></EmailButton>
              </span>
            )}

            {!emailNotice && smsNotice && isSmsVerified && (
              <span>
                <p className="noticealert"><strong>알림 서비스 :</strong> sms</p>
                {/* 문자 인증 버튼 표시 */}
                <p className="noticealert2">문자 인증이 완료됐습니다.</p>
              </span>
            )}

            {!emailNotice && !smsNotice && (
              <p className="noticealert"><strong>알림 서비스 :</strong> 사용하지 않음</p>
            )}
    
          </div>
          <div className="keyword_section">
            <h3 className="section_title">관심 키워드</h3>
            <div className="keywords">
            {keywords && keywords.length > 0 ? (
              keywords.map((keyword) => (
                <p key={keyword.id} onClick={() => handleKeywordClick(keyword.keyword_text)}>
                  <strong>{keyword.keyword_text}</strong>
                </p>
              ))
            ) : (
              <p>
                <strong>키워드 없음</strong>
              </p>
            )}
            </div>
          </div>
          <div className="survey_section">
            <Link
                to={`/editPage?name=${name}&email=${email}&phoneNumber=${phoneNumber}&keywords=${keywords.map(keyword => keyword.keyword_text).join(',')}&emailNotice=${emailNotice}&smsNotice=${smsNotice}`}
                className="linkbutton"
            >
                수정
            </Link>
            <button>회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
}
