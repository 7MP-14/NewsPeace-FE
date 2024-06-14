import {React,  useEffect} from "react";
import { useState } from "react";
import '../css/headers.css';
// import '../css/header.css';
import LoginModal from './loginModal.js';
// import { useNavigate } from 'react-router-dom';
import icon1 from '../img/돋보기.png';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // 추가
import Loading from './Loading.js';

const Header = (props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 창 상태를 추적
  const [inputkeyword, setinputKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [hotKeywords, setHotKeywords] = useState([]);
  const [currentHotKeywordIndex, setCurrentHotKeywordIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animationClass, setAnimationClass] = useState('keyword-animation-enter');
  const [hot5Keywords, setHot5Keywords]=useState([]);
  const [hot5KeywordsInfo, setHot5KeywordsInfo]=useState([]);

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // 모달 창 열기
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // 모달 창 닫기
  };
  const handleKeywordChange = (event) => {
    setinputKeyword(event.target.value);
  };
  // Enter로 검색
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submit(); 
    }
  };

  // 검색어 FETCH 함수
  const submit = () => {
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
//인기 검색어 FETCH 함수
const hotkeywordsubmit=()=>{
  setLoading(true);

  fetch(`${apiUrl}/news/search/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      keyword: hotKeywords[currentHotKeywordIndex], // 선택된 핫 키워드 사용
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
}
//인기 검색어 전체 보여주는 함수
const allkeywordsubmit=(keyword)=>{
  setLoading(true);

  fetch(`${apiUrl}/news/search/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      keyword: keyword,
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
}

//인기검색어 GET FETCH 함수
const getHotKeyword=()=>{
  fetch(`${apiUrl}/hot/`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log('성공');
      console.log(res);
      setHotKeywords(res.hot_search_keyword);
      setHot5Keywords(res.hot_5_keyword);
      setHot5KeywordsInfo(res.hot_5_keyword_info);
    })
    .catch((error) => {
      console.error('에러:', error);
    });
  }

 //인기검색어 애니메이션 함수
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 먼저 애니메이션 클래스를 제거
      setAnimationClass('');
      // 약간의 지연 후에 애니메이션 클래스를 다시 적용
      setTimeout(() => {
        setAnimationClass('keyword-animation-enter');
        setCurrentHotKeywordIndex(prevIndex => (prevIndex + 1) % 10);
        // 다음 키워드로 이동, 4일 경우 0으로 초기화
        // setCurrentHot5KeywordIndex((prevIndex) => (prevIndex + 1) % hot5Keywords.length);
      }, 100);
    }, 2000); // 4초마다 키워드 업데이트

    return () => clearInterval(intervalId);
  }, [hotKeywords.length, currentHotKeywordIndex]);
const checkedItemHandler = (category) => {
  setCheckedItems((prevSelected) => {
    if (prevSelected.includes(category)) {
      return prevSelected.filter((one) => one !== category);
    } else {
      return [...prevSelected, category];
    }
  });
};

useEffect(() => {
  getHotKeyword();
}, []);

  return (
      <div className="navbar_container">
        <a className="navbarbrand" href="/"> <strong>Newspeace</strong></a>
        <div className="firstDiv">
          <div className="inputDiv">
            <input
              className="input-control"
              id="keyword"
              type="text"
              value={inputkeyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyPress}
              placeholder="관심 있는 키워드를 입력하세요."
            />
            <div>
              <img src={icon1} style={{ width: '40px', height: '37px', cursor: 'pointer'}} onClick={submit} alt="search icon" />
            </div>
          </div>
          <div className="categorybtn">
              <button className={`checkbtn ${checkedItems.includes('정치') ? 'selected' : ''}`} onClick={() => checkedItemHandler('정치')}>정치</button>
              <button className={`checkbtn ${checkedItems.includes('경제') ? 'selected' : ''}`} onClick={() => checkedItemHandler('경제')}>경제</button>
              <button className={`checkbtn ${checkedItems.includes('사회') ? 'selected' : ''}`} onClick={() => checkedItemHandler('사회')}>사회</button>
              <button className={`checkbtn ${checkedItems.includes('문화') ? 'selected' : ''}`} onClick={() => checkedItemHandler('문화')}>문화</button>
              <button className={`checkbtn ${checkedItems.includes('IT') ? 'selected' : ''}`} onClick={() => checkedItemHandler('IT')}>IT</button>
              <button className={`checkbtn ${checkedItems.includes('연예') ? 'selected' : ''}`} onClick={() => checkedItemHandler('연예')}>연예</button>
              <button className={`checkbtn ${checkedItems.includes('스포츠') ? 'selected' : ''}`} onClick={() => checkedItemHandler('스포츠')}>스포츠</button>
          </div>
        </div>
        <div className="secondDiv">
          <div className="navigatebar_menu">
            {props.login ?
              (
                <span className="mainfuncbtn">
                  <a className="navibtn" href="/notice">공지사항</a>
                  {/* <a className="navibtn" href="/notice">뉴스피스 소개</a> */}
                  {/* <a className="navibtn" href="/notice">뉴스보기</a> */}
                  {/* <a className="navibtn" href="/scrap">즐겨찾기</a> */}
                  <a className="navibtn" href="/mypage">마이페이지</a>
                  <a className="navibtn" href="/logout">로그아웃</a>
                </span>
              ) :
              (
                <span>
                  <span className="mainfuncbtn">
                    <a className="navibtn" href="/notice">공지사항</a>
                    {/* <a className="navibtn" href="/notice">뉴스피스 소개</a> */}
                  </span>
                  <span className="loginbtn">
                    <a className="navibtn" style={{cursor:"pointer"}} onClick={openLoginModal}>로그인</a>
                  </span>
                </span>
              )
            }
          </div>
            
          <div className="hottopic">
            <p className="label">인기 검색어:</p>
            <div className="keyword-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {hotKeywords.length > 0 && (
                <p
                  className={`keyword ${isHovered ? 'hovered ' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => hotkeywordsubmit(hotKeywords[currentHotKeywordIndex])}
                >
                  {currentHotKeywordIndex + 1}. {hotKeywords[currentHotKeywordIndex]}
                </p>
              )}
              {isHovered && (
                <div className="all-keywords">
                  {hotKeywords.map((keyword, index) => (
                    <p style={{cursor: 'pointer', fontWeight: 'normal'}}
                    onMouseOver={(e) => { e.target.style.fontWeight = 'bold'; }} onMouseOut={(e) => { e.target.style.fontWeight = 'normal'; }}
                    key={index} className="keyword" onClick={() => allkeywordsubmit(keyword)}>
                      {index + 1}. {keyword}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => closeLoginModal()}
        />
      </div>
  );
}

export default Header;
