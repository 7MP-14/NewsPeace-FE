import React from "react";

function NoticeModal({ isOpen, onClose, notice }) {
  const isadmin = window.localStorage.getItem("is_admin");

  if (!isOpen || !notice) return null;

  // Function to handle the delete action
  const handleDelete = () => {
    // Make a fetch request to delete the notice by its ID
    fetch(`http://newspeace.co.kr/notice/${notice.id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Notice deleted successfully');
          window.location.replace('/notice');
          // Optionally, you can perform additional actions, such as updating the UI
        } else {
          console.error('Failed to delete notice');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="notice-title">{notice.title}</h2>
        <div className="deletediv">
          <p className="notice-date">작성일: {notice.created}</p>
          {isadmin && (
            <button className="delete-button2" onClick={handleDelete}>
              삭제
            </button>
          )}
        </div>
        <p className="notice-content">{notice.body}</p>
        {notice.image && (
          <img className='notice-img' src={notice.image} alt="Notice" />
        )}
      </div>
    </div>
  );
}

export default NoticeModal;
