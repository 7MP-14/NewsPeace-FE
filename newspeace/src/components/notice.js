import React, { useState, useEffect } from "react";
import NoticeModal from './noticeModal'; // 모달 컴포넌트 import
import '../css/notice.css';
import { Link } from "react-router-dom";

export default function Notice() {

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice=()=>{
    fetch("http://newspeace.co.kr/notice/",{
      method:'GET',
      headers:{
        'Content-Type':'application/json; charset=utf-8',

      },
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      setNotices(res);

    })
  }


  const openModal = notice => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <div className="notice">
    {/* 페이지 타이틀 */}
    <div className="page-title">
      <div className="notice_container">
        <h3><strong>공지사항</strong></h3>
      </div>
    </div>

    {/* 공지사항 목록 */}
    <div id="board-list">
      <div className="container">
        <div className="addNoticeContainer">
          {/* Use Link instead of a regular button to enable navigation */}
          <Link to="/write" className="addNotice">글쓰기</Link>
        </div>
        <table className="board-table">
          <thead>
            <tr>
              <th scope="col" className="th-num">번호</th>
              <th scope="col" className="th-title">제목</th>
              <th scope="col" className="th-date">등록일</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={index} onClick={() => openModal(notice)}>
                <td>{notice.id}</td>
                <th>
                  <a href="#!">{notice.title}</a>
                </th>
                <td>{notice.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      {/* 공지사항 모달 */}
      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notice={selectedNotice}
      />
    </div>
  );
}
