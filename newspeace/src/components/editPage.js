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
        phone_number: queryParams.get("phoneNumber") || "",
        emailNotice: queryParams.get("emailNotice") === "true",
        smsNotice: queryParams.get("smsNotice") === "true",
        keywords: queryParams.get("keywords") ? queryParams.get("keywords").split(',').map(keyword => ({ keyword_text: keyword.trim() })) : [],
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
                // 이메일 및 문자 알림 설정 관련 필드는 NotifyTF가 true일 때만 전송
                // if (key === "smsNotice" || key === "emailNotice") {
                //     return userData.NotifyTF && value !== undefined;
                // }

                // 비밀번호 및 키워드 필드는 전송하지 않음
                return key !== "password" && !(key === "keywords" && Array.isArray(value) && value.length === 0) && value !== "";
            })
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        console.log('Request Body:', JSON.stringify(filteredData));

        try {
            // 필터링된 데이터가 비어있지 않을 때만 fetch 요청 보내기
            if (Object.keys(filteredData).length > 0) {
                const response = await fetch(`${apiUrl}/api/profile/${window.localStorage.getItem("user_id")}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        // "Authorization": `Bearer ${window.localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(filteredData),
                });

                if (!response.ok) {
                    throw new Error('서버 응답이 실패했습니다.');
                }

                console.log('프로필이 성공적으로 수정되었습니다.');
                window.location.replace('/mypage');
            } else {
                console.log('수정할 데이터가 없습니다.');
            }
        } catch (error) {
            console.error('프로필 수정 중 오류가 발생했습니다.', error);
        }

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
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="phone_number">전화번호:</label>
                        </div>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            placeholder={userData.phone_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="label-group">
                            <label htmlFor="keywords">키워드:</label>
                        </div>
                        {/* {userData.keywords.length > 0 ? ( */}
                            <input
                                type="text"
                                id="keywords"
                                name="keywords"
                                placeholder={userData.keywords.map(keyword => keyword.keyword_text).join(', ')}
                                onChange={handleInputChange}
                            />
                        {/* ) : ( */}
                            {/* <p>키워드를 설정하지 않음</p> */}
                        {/* )} */}
                    </div>
                    <div className="form-group notify-group3">
                        {/* <input
                            type="checkbox"
                            id="NotifyTF"
                            name="NotifyTF"
                            checked={userData.NotifyTF}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="NotifyTF" className="notify-label">관심 키워드에 대한 부정적 기자 탐지 시 알림을 받겠습니다.</label> */}
                        <p>관심 키워드에 대한 부정적 기사 탐지 시 알림을 받겠습니다.</p>
                    </div>

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

                    <div className="form-group button-group">
                        <button type="submit" className="submit-btn">수정완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
}