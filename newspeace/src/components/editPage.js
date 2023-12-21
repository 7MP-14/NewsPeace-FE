import React, { useState } from "react";
import '../css/editPage.css';
import backimg from "../img/bg-masthead.jpg";

export default function Editpage(props) {
    const [userData, setUserData] = useState({
        name: "",
        phone_number: "",
        email: "",
        keywords: [],
        // NotifyTF: false,
        emailNotice: false,
        smsNotice: false,
        password:"wjdthf123",
    });

    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;

        if (name === "keywords") {
            setUserData({
                ...userData,
                [name]: value.split(',').map(keyword => ({ keyword_text: keyword.trim() }))
            });
        } else {
            setUserData({
                ...userData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Request Body:', JSON.stringify(userData));  // 추가

        try {
            const response = await fetch(`http://3.34.92.70/api/profile/${window.localStorage.getItem("user_id")}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    // "Authorization": `Bearer ${window.localStorage.getItem("token")}`
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }

            console.log('프로필이 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('프로필 수정 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div className="editpage-body" style={{ backgroundImage: `url(${backimg})` }}>
            <div className="mypage-edit">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="name">이름:</label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="정솔"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="phone_number">전화번호:</label>
                        </div>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            placeholder="010-0000-0000"
                            value={userData.phone_number}
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
                            placeholder="bohomi1995j@gmail.com"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="keywords">키워드:</label>
                        </div>
                        <input
                            type="text"
                            id="keywords"
                            name="keywords"
                            placeholder="스포츠, 경제"
                            value={userData.keywords.map(keyword => keyword.keyword_text).join(', ')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group notify-group">
                        <input
                            type="checkbox"
                            id="NotifyTF"
                            name="NotifyTF"
                            checked={userData.NotifyTF}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="NotifyTF" className="notify-label">관심 키워드에 대한 부정적 기자 탐지 시 알림을 받겠습니다.</label>
                    </div>
                    {userData.NotifyTF && (
                        <div className="form-group notify-group2">
                            <input
                                type="checkbox"
                                id="smsNotice"
                                name="smsNotice"
                                checked={userData.smsNotice}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="smsNotice" className="notify-label">문자</label>
                            <input
                                type="checkbox"
                                id="emailNotice"
                                name="emailNotice"
                                checked={userData.emailNotice}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="emailNotice" className="notify-label">이메일</label>
                        </div>
                    )}
                    <div className="form-group button-group">
                        <button type="submit" className="submit-btn">수정완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
