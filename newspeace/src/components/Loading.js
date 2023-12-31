// Loading.js
import React from 'react';
import styled from 'styled-components';
import Spinner from '../img/Spinner-1s-200px.gif';

const Background = styled.div`
    position:fixed;
    width:100vw;
    height:100vh;
    top:0;
    left:0;
    background:#ffffffb7;
    z-index:999;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

`;

const LoadingText = styled.div`
    font:3rem 'nanumsquare';
    text-align:center;
    margin-bottom:1rem;
`;

const LoadingImage = styled.img`
    width:15%;
`;

const Loading = () => {
    return (
        <Background>
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
            <LoadingImage src={Spinner} alt='로딩중'/>
        </Background>
    );
};

export default Loading;
