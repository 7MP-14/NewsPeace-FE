import React from "react";

function NoticeModal({ isOpen, onClose, notice }) {
  if (!isOpen || !notice) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="notice-title">{notice.title}</h2>
        <p className="notice-date">작성일: {notice.date}</p>
        <p className="notice-content">{notice.content}</p>
        <button className="modal-close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default NoticeModal;
