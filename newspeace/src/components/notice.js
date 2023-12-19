import React, { useState } from "react";
import NoticeModal from './noticeModal'; // 모달 컴포넌트 import
import '../css/notice.css';
import { Link } from "react-router-dom";

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 공지사항 데이터 - 예시
  const notices = [
    { id: 1, date : '2023-12-15',title: "[중요] 공공용 네이버웍스 V3.8 정기 업데이트 소식", content: `안녕하세요, 네이버웍스입니다.
    공공용 네이버웍스 V3.8 정기 업데이트가 2023년 12월 15일(목)에 진행됩니다.
    
     
    
    ■ 업데이트 일정: 2023년 12월 15일(목) 오전 중
    
    작업 시간 중에도 네이버웍스 서비스를 이용할 수 있으나 서비스 접속이 일시적으로 불안정할 수 있으며, 앱 노출 시간은 앱 스토어 사정에 따라 상이할 수 있습니다.    
    
    
    ■ 배포 대상
    
    ① NAVER WORKS
    Windows 버전/macOS 버전/Android/iOS 버전
    
     
    
    ■ 배포 대상
    
    ① NAVER WORKS
    Windows 버전/macOS 버전/Android/iOS 버전
    
     
    
     
    
    ■ 배포 대상
    
    ① NAVER WORKS
    Windows 버전/macOS 버전/Android/iOS 버전
    
     
    
    ■ 업데이트 내용` },
    { id: 2, date : '2023-12-15', title: "공지사항 2", content: "내용 2" },
    { id: 3, date : '2023-12-15', title: "공지사항 3", content: "내용 3" },

    // ... 추가 공지사항
  ];

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
              {notices.map(notice => (
                <tr key={notice.id} onClick={() => openModal(notice)}>
                  <td>{notice.id}</td>
                  <th>
                    <a href="#!">{notice.title}</a>
                  </th>
                  <td>날짜</td>
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
