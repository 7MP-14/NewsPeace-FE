import React, { useState, useEffect } from "react";
import '../css/mypage.css';
// import backimg from "../img/bg-masthead.jpg";
import icon2 from '../img/user.png'
import { Link, useNavigate } from "react-router-dom";
import EmailButton from './sendEmail.js';

export default function Mypage(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [keywords, setKeywords] = useState([]);
  const [emailNotice, setEmailNotice] = useState();
  const [smsNotice, setSmsNotice] = useState();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  // const [keywords, setKeywords] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [selectedKeywords, setSelectedKeywords] = useState([]); // 선택된 키워드를 관리하는 상태 추가

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userId = `${window.localStorage.getItem('user_id')}`
    fetch(`${apiUrl}/api/profile/${userId}/`, {
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
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // 수정 모드 전환 시 선택된 키워드 초기화
    setSelectedKeywords([]);
  };

  const handleCheckboxChange = (keywordId, isChecked) => {
    if (isChecked) {
      // 체크된 경우 선택된 키워드에 추가
      setSelectedKeywords((prevSelected) => [...prevSelected, keywordId]);
    } else {
      // 체크 해제된 경우 선택된 키워드에서 제거
      setSelectedKeywords((prevSelected) =>
        prevSelected.filter((id) => id !== keywordId)
      );
    }
  };
  
  // 새로운 키워드를 추가하는 함수
  const handleAddKeyword = () => {
    if (newKeyword) {
      // 새 키워드를 keywords 배열에 추가
      const newKeywords = [...keywords, { id: Date.now(), keyword_text: newKeyword }];
      setKeywords(newKeywords);
      // setNewKeyword(newKeywords);
      setNewKeyword(''); // 텍스트 필드를 비우기
      // 서버에 새 키워드를 저장하는 API 호출이 필요한 경우 여기에 추가합니다.
    }
  };

  // 키워드 목록을 저장하는 함수
  const handleSaveKeywords = () => {
    // 서버에 keywords 배열을 저장하는 API 요청을 보냅니다.
    
    const userId = window.localStorage.getItem("user_id");
  
    // 기존 키워드와 새로운 키워드를 합쳐서 API에 전송합니다.
    const updatedKeywords = isEditing
      ? [...keywords, ...selectedKeywords.map(keywordId => ({ id: keywordId, keyword_text: newKeyword }))]
      : keywords;
  
    const formattedKeywords = updatedKeywords.map(keyword => ({ keyword_text: keyword.keyword_text }));
  
    fetch(`${apiUrl}/api/profile/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ keywords: formattedKeywords }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Keywords saved successfully');
        return response.json();
      } else {
        console.error('Failed to save keywords');
      }
    })
    .then(res => {
      setKeywords(updatedKeywords); // 상태를 업데이트하여 UI에 반영
      //navigate('/mypage'); // 마이페이지로 이동 (선택적)
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  


  const handleDeleteSelectedKeywords = () => {
    // 선택된 키워드를 삭제하는 로직을 추가
    // 여기에 실제 삭제 로직을 추가하면 됩니다.
    console.log('삭제할 키워드 ID 목록:', selectedKeywords);
    // 예시: 선택된 키워드 삭제 후 프로필 정보 다시 가져오기
    getProfile();
    // 또는, 직접 API 호출 등을 통해 삭제 로직을 추가해야 합니다.
    // ...
    // Function to handle the delete action
  fetch(`${apiUrl}/api/profile/${window.localStorage.getItem("user_id")}/keywords/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body:JSON.stringify({
      keyword_ids:selectedKeywords
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Notice deleted successfully');
        window.location.replace('/mypage');
        // Optionally, you can perform additional actions, such as updating the UI
      } else {
        console.error('Failed to delete notice');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    // 수정 모드 종료 및 선택된 키워드 초기화
    setIsEditing(false);
    setSelectedKeywords([]);
  };

  return (
    <div className="mypage_body" style={{ backgroundImage: `white` }}>
      <div className="mypage_container">
        <div className="leftbox">
          <div className="profile_section">
            <div className="profile_info">
              <img src={icon2} className="profile_photo" alt="Profile" />
              <h2 className="profile_name">{name} 님, 안녕하세요!</h2>
            </div>
          </div>
          <div className="userinfo_section">
          <div className="section_header">
            <h3 className="section_title">개인정보</h3>
            <Link
              to={`/editPage?name=${name}&email=${email}&phoneNumber=${phoneNumber}&keywords=${keywords.map(keyword => keyword.keyword_text).join(',')}&emailNotice=${emailNotice}&smsNotice=${smsNotice}`}
              className="linkbutton">
              수정
            </Link>
          </div>
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
          {/* <div className="keyword_section">
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
          </div> */}
           <div className="keyword_section">
        <div className="section_header">
          <h3 className="section_title">관심 키워드</h3>
          {/* 수정된 부분: 편집 모드 여부에 따라 버튼 텍스트 변경 */}
          <button className="deletebutton4" onClick={isEditing ? handleDeleteSelectedKeywords : handleEditToggle} >
            {isEditing ? '삭제' : '수정'}
          </button>
          {isEditing && (
              <button className="savebutton" onClick={handleSaveKeywords}>
                저장
              </button>
            )}
        </div>
        <div className="">
        <div className="keywords">
          {keywords && keywords.length > 0 ? (
            keywords.map((keyword) => (
              <div key={keyword.id} className="keyword-item">
                {/* 수정된 부분: 편집 모드일 때만 체크박스 표시 */}
                {isEditing && (
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(keyword.id, e.target.checked)
                    }
                    checked={selectedKeywords.includes(keyword.id)}
                  />
                )}
                <p onClick={() => handleKeywordClick(keyword.keyword_text)}>
                  <strong>{keyword.keyword_text}</strong>
                </p>
              </div>
            ))
          ) : (
            <p>
              <strong>키워드 없음</strong>
            </p>
          )}
        </div>
        </div>
        {isEditing && (
              <>
                <div className="keyword-add">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="새 키워드 입력"
                  />
                  <button onClick={handleAddKeyword}>추가</button>
                </div>
              </>
            )}
      </div>
          <div className="survey_section">
            <button>회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
