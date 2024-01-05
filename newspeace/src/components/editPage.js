import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import '../css/editPage.css';
import backimg from "../img/bg-masthead.jpg";

export default function Editpage(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [userData, setUserData] = useState({
        name: queryParams.get("name") || "",
        email: queryParams.get("email") || "",
        emailNotice: queryParams.get("emailNotice") === "true",
    });

    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;

        if (type === 'checkbox') {
            setUserData({ ...userData, [name]: checked });
        } else if (name === "keywords") {
            setUserData({
                ...userData,
                [name]: value ? value.split(',').map(keyword => ({ keyword_text: keyword.trim() })) : []
            });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 입력받은 값들만 필터링
        const filteredData = Object.entries(userData)
            .filter(([key, value]) => {
                return key !== "password" && !(key === "keywords" && Array.isArray(value) && value.length === 0) && value !== "";
            })
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        console.log('Request Body:', JSON.stringify(filteredData));

        fetch(`${apiUrl}/api/profile/${window.localStorage.getItem("user_id")}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(filteredData),
        })
        .then(res => res.json())
        .then(res => {
          console.log('성공');
          console.log(res);
          window.location.replace('/mypage');
        })
        .catch(error => {
          console.error('에러:', error);
        });

    };

    return (
        <div className="editpage-body" style={{ backgroundImage: `url(${backimg})` }}>
            <div className="mypage-edit">
                <form onSubmit={handleSubmit} className="edit-form">
                    {/* ... 나머지 입력 필드는 동일하게 유지 */}
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="name">이름:</label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="email">이메일:</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="password">비밀번호:</label>
                        </div>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            placeholder={userData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group notify-group3">
                    <input
                            type="checkbox"
                            id="emailNotice"
                            name="emailNotice"
                            checked={userData.emailNotice}
                            onChange={handleInputChange}
                        />
                        <p>관심 키워드에 대한 부정적 기사 탐지 시 이메일 알림을 받겠습니다.</p>
                    </div>
                    <div className="form-group button-group">
                        <button type="submit" className="submit-btn">수정완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
}