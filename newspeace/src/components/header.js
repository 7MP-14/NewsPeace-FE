import React from "react";
import { useState } from "react";
import '../css/headers.css';
import LoginModal from './loginModal.js';
export default function Header(props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 창 상태를 추적

  const openLoginModal = () => {
    setIsLoginModalOpen(true); // 모달 창 열기
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // 모달 창 닫기
  };
  return (
    // Navigation
        <div className="navbar_container">
            <a className="navbarbrand" href="/"> <strong>Newspeace</strong></a>
            <div className="navigatebar_menu">
            {
            props.login
            ?
            (
              <span className="mainfuncbtn">
              <a className="navibtn" href="/notice">공지사항</a>
              <a className="navibtn" href="/notice">뉴스피스 소개</a>
              <a className="navibtn" href="/notice">뉴스보기</a>
              <a className="navibtn" href="/scrap">즐겨찾기</a>
              <a className="navibtn" href="/mypage">마이페이지</a>
              <a className="navibtn" href="/logout">로그아웃</a>
              </span>
            )
            :
            (
              <span>
                <span className="mainfuncbtn">
                  <a className="navibtn" href="/notice">공지사항</a>
                  <a className="navibtn" href="/notice">뉴스피스 소개</a>
                  <a className="navibtn" href="/notice">뉴스보기</a>
                </span>
                <span className="loginbtn">
              {/* 로그인 버튼 클릭 시 모달 열기 */}
              <button className="navibtn" onClick={openLoginModal}>로그인</button>
            </span>
          </span>
        )}
      </div>
      {/* LoginModal을 모달이 열려있을 때만 렌더링 */}
      {/* {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={setIsLoginModalOpen} />} */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => closeLoginModal()}
      />
      {/* <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        notice={selectedNotice}
      /> */}
    </div>
  
  );
}