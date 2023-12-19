import React, { useState } from "react";
import '../css/editPage.css';
import backimg from "../img/bg-masthead.jpg";

export default function Editpage(props) {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
        keywords: "",
        NotifyTF:false,
        emailNotify: false,
        textNotify: false
    });

    const handleInputChange = (event) => {
        const { name, type, checked, value } = event.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();        
        console.log(userData);
    };

    return (
        <div className="editpage-body" style={{ backgroundImage: `url(${backimg})` }}>
            <div className="mypage-edit">
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
                            <label htmlFor="phone">전화번호:</label>
                        </div>
                        <input 
                            type="text" 
                            id="phone" 
                            name="phone" 
                            placeholder="010-0000-0000"
                            value={userData.phone} 
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
                            placeholder="정치, 경제"
                            value={userData.keywords} 
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
                                id="textNotify" 
                                name="textNotify" 
                                checked={userData.textNotify} 
                                onChange={handleInputChange} 
                            />
                            <label htmlFor="textNotify" className="notify-label">문자</label>
                            <input 
                                type="checkbox" 
                                id="emailNotify" 
                                name="emailNotify" 
                                checked={userData.emailNotify} 
                                onChange={handleInputChange} 
                            />
                            <label htmlFor="emailNotify" className="notify-label">이메일</label>
                        </div>
                    )}
                    <div className="form-group button-group">
                        <button type="submit" className="submit-btn">수정완료</button>
                    </div>
            </div>
        </div>
    );
}



