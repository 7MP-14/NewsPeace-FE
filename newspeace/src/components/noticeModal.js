import React, { useState } from "react";

function NoticeModal({ isOpen, onClose, notice }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const isadmin = window.localStorage.getItem("is_admin");
  const [updatedNotice, setUpdatedNotice] = useState({ ...notice });
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !notice) return null;

  // Function to handle the delete action
  const handleDelete = () => {
    // Make a fetch request to delete the notice by its ID
    fetch(`${apiUrl}/notice/${notice.id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Notice deleted successfully");
          window.location.replace("/notice");
          // Optionally, you can perform additional actions, such as updating the UI
        } else {
          console.error("Failed to delete notice");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to handle updating notice content
  const handleUpdate = () => {
    // Make a fetch request to update the notice by its ID
    fetch(`${apiUrl}/notice/${notice.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(updatedNotice),
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false); // Exit editing mode after successful update

          console.log("Notice updated successfully");
          // Optionally, you can perform additional actions, such as updating the UI
          window.location.reload();
        } else {
          console.error("Failed to update notice");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="overlay-close-button" onClick={onClose}>
        X
      </button>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="notice-title">{notice.title}</h2>
        <div className="deletediv">
          <p className="notice-date">작성일: {notice.created}</p>
          <div className="buttons">
            {isadmin === "true" && !isEditing && (
              <button className="update-button" onClick={() => setIsEditing(true)}>
                수정
              </button>
            )}
            {isadmin === "true" && (
              <button className="delete-button2" onClick={handleDelete}>
                삭제
              </button>
            )}
          </div>
        </div>
        {isEditing ? (
          <textarea
            className="notice-content"
            value={updatedNotice.body}
            onChange={(e) =>
              setUpdatedNotice({ ...updatedNotice, body: e.target.value })
            }
          />
        ) : (
          <p className="notice-content">{notice.body}</p>
        )}
        {notice.image && (
          <img className="notice-img" src={notice.image} alt="Notice" />
        )}
        {isEditing && (
          <button className="update-button" onClick={handleUpdate}>
            저장
          </button>
          
        )}
        {isEditing && (
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            취소
          </button>
        )}
      </div>
    </div>
  );
}

export default NoticeModal;
