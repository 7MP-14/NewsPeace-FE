import React from "react";
import '../css/header.css';
export default function Header(props) {
  return (
    // Navigation
    <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
            <a className="navbar-brand" href="/"> <strong>Newspeace</strong></a>
            <span className="menu">
            {
            props.login
            ?
            (
              <span>
              <a className="btn btn-primary" href="/notice">공지사항</a>
              <a className="btn btn-primary" href="/scrap">즐겨찾기</a>
              <a className="btn btn-primary" href="/mypage">마이페이지</a>
              <a className="btn btn-primary" href="/logout">로그아웃</a>
              </span>
            )
            :
            (
              <span>
                <a className="btn btn-primary" href="/notice">공지사항</a>
                <a className="btn btn-primary" href="/login">로그인</a>
                <a className="btn btn-primary" href="/signup">회원가입</a>
              </span>
            )
            }
            </span>
            
        </div>
    </nav>
  
  );
}