import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"; //npm install react-router-dom --save
import React from "react";
import Header from './components/header.js';
import Home from './components/home.js' ;
import Login from './components/login.js';
import Footer from './components/footer.js';
<<<<<<< HEAD
import Result from './components/result.js';
=======
import Signup from './components/signup.js';
import Result from './components/result.js';


>>>>>>> 277b976979dee9dc7a8e5806488d22738b8d98ad
import styled from "styled-components"; //npm i styled-components

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;
function App() {

  return (
    <AllWrapper>
      <ContentWrapper>
        <Header/>
        <Router>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
<<<<<<< HEAD
              <Route exact path="/result" element={<Result/>} />
=======
              <Route exact path="/signup" element={<Signup/>} />


          </Routes>
        </Router>
          
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}

export default App;
