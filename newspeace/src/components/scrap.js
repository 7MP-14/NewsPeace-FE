import React, { useState } from "react";
import '../css/scrap.css';
import backimg from "../img/bg-masthead.jpg";
import newsImage1 from "../img/뉴스1.jpg";
import newsImage2 from "../img/뉴스2.jpg";
import newsImage3 from "../img/뉴스3.jpg";
import newsImage4 from "../img/뉴스4.jpg";
import newsImage5 from "../img/뉴스5.jpg";
import newsImage6 from "../img/뉴스6.jpg";
import newsImage7 from "../img/뉴스7.jpg";
import newsImage8 from "../img/뉴스8.jpg";
import newsImage9 from "../img/뉴스9.jpg";
import newsImage10 from "../img/뉴스9.jpg";
import newsImage11 from "../img/뉴스9.jpg";
import newsImage12 from "../img/뉴스9.jpg";
import newsImage13 from "../img/뉴스9.jpg";
import newsImage14 from "../img/뉴스9.jpg";
import newsImage15 from "../img/뉴스9.jpg";
import newsImage16 from "../img/뉴스9.jpg";


export default function ScrapSection() {
  const articlesPerRow = 4; // 한 줄에 보여줄 기사의 수
  const rowsPerPage = 3; // 한 페이지에 보여줄 줄의 수
  const [currentPage, setCurrentPage] = useState(1);

  // 가정된 원본 기사 데이터
  const originalArticles = [
    { id: 1, title: '전교조 "국교위, 교원단체 추천 위원 1명 하루 빨리 위촉해야"', image: newsImage1 },
    { id: 2, title: "온플법 제정시 韓 스타트업 투자 못해.. 제2의 네이버·배민 불가능", image: newsImage2 },
    { id: 3, title: '국세청, 연말정산 꿀팁 공개…“간소화 서비스 1월15일에 개통”', image: newsImage3 },
    { id: 4, title: "한동훈, 與 비대위원장 수락…오후 법무장관 사퇴", image: newsImage4 },
    { id: 5, title: "한동훈, 與 비대위원장 수락…오후 법무장관 사퇴", image: newsImage5 },
    { id: 6, title: "'침착맨 떴다'…네이버 `치지직`, 최대 11만명 시청", image: newsImage6 },
    { id: 7, title: "“AI가 만드는 미래 한눈에”… 삼성·LG·인텔·퀄컴·로레알 CEO, ‘CES 2024’에 총출동", image: newsImage7 },
    { id: 8, title: "삼성전자, '갤럭시북 3 Go 5G' 출시...55만7700원", image: newsImage8 },
    { id: 9, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage9 },
    { id: 10, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage10 },
    { id: 11, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage11 },
    { id: 12, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage12 },
    { id: 13, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage13 },
    { id: 14, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage14 },
    { id: 15, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage15 },
    { id: 16, title: "LG CNS, 구글 클라우드 '데이터 분석 전문기업' 인증", image: newsImage16 },
    
    // 추가 기사 데이터 필요...
  ];

  // 페이지네이션을 위한 총 기사 수 설정
  const totalArticles = originalArticles.length; // 실제 앱에서는 이 값을 서버로부터 받아와야 합니다.
  const totalPage = Math.ceil(totalArticles / (articlesPerRow * rowsPerPage));
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  // 현재 페이지에 맞는 기사 목록을 가져옵니다.
  const currentArticles = originalArticles.slice(
    (currentPage - 1) * articlesPerRow * rowsPerPage,
    currentPage * articlesPerRow * rowsPerPage
  );

  // 페이지 번호를 클릭하면 현재 페이지를 업데이트합니다.
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="scrap-section-body" style={{ backgroundImage: `url(${backimg})` }}>
      <div className="scrap-section">
        <div className="section-title-scrap-container">
          <h3 className="section-title-scrap">스크랩 기사</h3>
          <div className="title-underline"></div>
        </div>
        <div className="articles-container">
          {currentArticles.map((article, index) => (
            <div className="article-card" key={index}>
              <img src={article.image} className="article-image" alt={`News ${article.id}`} />
              <div className="article-title-overlay">{article.title}</div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {pages.map(number => (
            <button key={number} onClick={() => paginate(number)} className={`page-number ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

















