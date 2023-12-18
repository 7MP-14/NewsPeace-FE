import styled from "styled-components";
import React from "react";
import '../css/header.css';


// const onLogout=()=>{
//   const token = window.localStorage.getItem('token');
//     // console.log('access token',token)
//   fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/logout/',{
//     method:'POST',
//     hearders:{
//       'Content-Type':'application/json; charset=utf-8'
//     },
//     body:JSON.stringify({
//       access_token:token
//     }),
//   })
//   .then(res=>res.json())
//   .then(res=>{
//     localStorage.clear()
//     window.location.replace("/")
//     console.log('로그아웃 했습니다.')
//   })

// }
export default function Header(props) {
  return (
    // Navigation
    <nav class="navbar navbar-light bg-light static-top">
        <div class="container">
            <a class="navbar-brand" href="/"> <strong>NewsPeace</strong></a>
            <span className="menu">
            {
            props.login
            ?
            (
              <span>
              <a class="btn btn-primary" href="/mypage">마이페이지</a>
              <a class="btn btn-primary" href="/logout">로그아웃</a>
              </span>
            )
            :
            (
              <span>
                <a class="btn btn-primary" href="/signup">회원가입</a>
                <a class="btn btn-primary" href="/login">로그인</a>
                <a class="btn btn-primary" href="/notice">공지사항</a>
              </span>
            )
            }
            </span>
            
        </div>
    </nav>
  
  );
}
