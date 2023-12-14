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
            <a class="navbar-brand" href="#!"> NewsPeace</a>
            <span className="menu">
              <a class="btn btn-primary" href="/signup">Sign Up</a>
              <a class="btn btn-primary" href="/login">LogIn</a>
            </span>
            
        </div>
    </nav>
  
  );
}
