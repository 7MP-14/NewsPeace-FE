import React from "react";
import '../css/header.css';
export default function Header(props) {
  return (
    // Navigation
    <nav class="navbar navbar-light bg-light static-top">
        <div class="container">
            <a class="navbar-brand" href="/"> <strong>Newspeace</strong></a>
            <span className="menu">
            {
            props.login
            ?
            (
              <span>
              <a class="btn btn-primary" href="/notice">공지사항</a>
              <a class="btn btn-primary" href="/scrap">즐겨찾기</a>
              <a class="btn btn-primary" href="/mypage">마이페이지</a>
              <a class="btn btn-primary" href="/logout">로그아웃</a>
              </span>
            )
            :
            (
              <span>
                <a class="btn btn-primary" href="/notice">공지사항</a>
                <a class="btn btn-primary" href="/login">로그인</a>
                <a class="btn btn-primary" href="/signup">회원가입</a>
              </span>
            )
            }
            </span>
            
        </div>
    </nav>
  
  );
}
