import React from "react";
import '../css/headers.css';
export default function Header(props) {
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
                  <a className="navibtn" href="/login">로그인</a>
                </span>
              </span>
            )
            }
            </div>
            
        </div>
  
  );
}