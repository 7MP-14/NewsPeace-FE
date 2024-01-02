import React, { useState, useEffect } from "react";
import '../css/scrap.css';
import backimg from "../img/bg-masthead.jpg";
import { Link } from 'react-router-dom';
import people6 from '../img/null.png';

export default function ScrapSection() {
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getScrap();
  }, []);

  const getScrap = () => {
    fetch(`/news/mynewsscript/${window.localStorage.getItem('user_id')}/`, {
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
      fetch(`/news/delete/${articleId}/`, {
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
              <button onClick={() => handleDelete(article.id)} className="delete-button">X</button>
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
