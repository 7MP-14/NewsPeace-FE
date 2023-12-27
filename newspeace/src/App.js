import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"; //npm install react-router-dom --save
import React from "react";
import Header from './components/header.js';
import Home from './components/home.js' ;
import Login from './components/login.js';
import Footer from './components/footer.js';
import Signup from './components/signup.js';
import Mypage from './components/mypage.js';
import Result from './components/result.js';
import Notice from './components/notice.js';
import Logout from './components/logout.js';
import Editpage from './components/editPage.js';
import Write from './components/noticeWrite.js';
import SendEmail from './components/sendEmail.js';
import ScrapPage from './components/scrap.js';
import MyChart from './components/myChart.js';
import styled from "styled-components"; //npm i styled-components
//npm install emailjs-com

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;
function App() {

  const [login, setLoginState]=useState(false);
  const storedUserLoggedIninfo=localStorage.getItem('token');
  useEffect(()=>{
    if(storedUserLoggedIninfo===null){
      console.log('로그인 실패')
    }
    else{
      setLoginState(true)
      console.log('로그인 성공')
    }
  })

  return (
    <AllWrapper>
      <ContentWrapper>
        <Header login={login}/>
        <Router>
          <Routes>
              <Route exact path="/" element={<Home login={login}/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/result" element={<Result/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/mypage" element={<Mypage/>} />
              <Route exact path="/notice" element={<Notice/>} />
              <Route exact path="/logout" element={<Logout/>} />
              <Route exact path="/editPage" element={<Editpage/>} />
              <Route exact path="/write" element={<Write/>} />
              <Route exact path="/sendemail" element={<SendEmail/>} />
              <Route exact path="/scrap" element={<ScrapPage/>} />
              <Route exact path="/myChart" element={<MyChart/>} />
          </Routes>
        </Router>
          
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}

export default App;
