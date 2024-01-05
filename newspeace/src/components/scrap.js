import React, { useState, useEffect } from "react";
import '../css/scrap.css';
import { Link } from 'react-router-dom';
import people6 from '../img/null.png';

export default function ScrapSection() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const articlesPerRow = 4;
  const rowsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [originalArticles, setOriginalArticles] = useState([]);
  const totalArticles = originalArticles.length;
  const totalPage = Math.ceil(totalArticles / (articlesPerRow * rowsPerPage));
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const currentArticles = originalArticles.slice(
    (currentPage - 1) * articlesPerRow * rowsPerPage,
    currentPage * articlesPerRow * rowsPerPage
  );

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPage);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPage));
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getScrap();
  }, []);

  const getScrap = () => {
    fetch(`${apiUrl}/news/mynewsscript/${window.localStorage.getItem('user_id')}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => res.json())
    .then(res => {
      const sortedArticles = res.myNews_script
        .map(article => ({
          ...article,
          img: article.img || people6,
          time: article.time 
        }))
        .sort((a, b) => new Date(b.time) - new Date(a.time)); 
      setOriginalArticles(sortedArticles);
      });
  };

  const handleDelete = (articleId) => {
    // Confirm before deleting
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      // Make a fetch request to delete the article by its ID
      fetch(`${apiUrl}/news/delete/${articleId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
        .then(response => {
          if (response.ok) {
            console.log('Scrap deleted successfully');
            window.location.replace('/scrap');
          } else {
            console.error('Failed to delete scrap');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="scrap-section-body">
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
              <button onClick={() => handleDelete(article.id)} className="delete-button">X</button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={goToFirstPage} disabled={currentPage === 1}>&laquo;</button>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>&lt;</button>
          {pages.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-number ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          <button onClick={goToNextPage} disabled={currentPage === totalPage}>&gt;</button>
          <button onClick={goToLastPage} disabled={currentPage === totalPage}>&raquo;</button>
        </div>
      </div>
    </div>
  );

}
