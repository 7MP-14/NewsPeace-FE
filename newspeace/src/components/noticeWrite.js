import React, { useState, useEffect } from "react";
import '../css/write.css';

export default function CreateNotice() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate);
  }, []); // Empty dependency array to run the effect only once

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", content);
    formData.append("image", image);
    formData.append("author", 1);

    fetch("http://3.34.92.70/notice/create/", {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // 성공적으로 전송되면 필요한 처리를 추가하세요.
        window.location.replace('/notice');
      })
      .catch((error) => {
        console.error('Error:', error);
        // 전송 중 오류가 발생하면 에러 처리를 추가하세요.
      });
  };

  return (
    <div className="create-notice">
      <h3>공지사항 작성</h3>
      <form>
        <div className="td-container">
          <div>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="image">이미지 첨부</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          작성완료
        </button>
      </form>
    </div>
  );
}
