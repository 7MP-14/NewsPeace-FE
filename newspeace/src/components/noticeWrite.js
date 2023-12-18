import React, { useState } from "react";
import '../css/write.css';

export default function CreateNotice() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // 여기에서 작성한 title, date, content를 서버로 전송(fetch)하는 로직을 추가하세요.
    // 백엔드 URL을 적절히 변경해주세요.
    fetch('http://example.com/api/createNotice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, content }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // 성공적으로 전송되면 필요한 처리를 추가하세요.
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
                type="date" // date picker를 사용하도록 변경
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
        <button type="button" onClick={handleSubmit}>
          작성완료
        </button>
      </form>
    </div>
  );
}