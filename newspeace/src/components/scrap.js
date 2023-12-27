import React, { useState, useEffect } from "react";
import '../css/scrap.css';
import backimg from "../img/bg-masthead.jpg";
import { Link } from 'react-router-dom';


export default function ScrapSection() {
  const articlesPerRow = 4; // 한 줄에 보여줄 기사의 수
  const rowsPerPage = 3; // 한 페이지에 보여줄 줄의 수
  const [currentPage, setCurrentPage] = useState(1);
  const [originalArticles, setOriginalArticles]=useState([]);

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

  useEffect(() => {
    getscrap();
  }, []);

  const getscrap=()=>{
    // fetch(`http://newspeace.co.kr/news/mynewsscript/${window.localStorage.getItem('user_id')}/`,{
    fetch(`http://newspeace.co.kr/news/mynewsscript/1/`,{

      method:'GET',
      headers:{
        'Content-Type':'application/json; charset=utf-8',

      },
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res.myNews_script)
      setOriginalArticles(res.myNews_script);

    })
  }

  const handleDelete = (articleId) => {
    // Make a fetch request to delete the notice by its ID
    // fetch(`http://newspeace.co.kr/news//delete/${window.localStorage.getItem('user_id')}/${articleId}/`, {
    fetch(`http://newspeace.co.kr/news/delete/1/1/`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Scrap deleted successfully');
          // window.location.replace('/scrap');

          // Optionally, you can perform additional actions, such as updating the UI
        } else {
          console.error('Failed to delete scrap');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="scrap-section-body" style={{ backgroundImage: `url(${backimg})` }}>
      <div className="scrap-section">
        <div className="section-title-scrap-container">
          <h3 className="section-title-scrap">스크랩 기사</h3>
          <div className="title-underline"></div>
        </div>
        <div className="articles-container">
        {currentArticles.map((article, index) => (
          <div key={index} className="article-card">
            <Link to={article.link}>
              <img src={article.img} className="article-image" alt={`News ${article.id}`} />
              <div className="article-title-overlay">{article.title}</div>
            </Link>
            <button onClick={() => handleDelete(article.id)} className="delete-button"> X</button>
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

















