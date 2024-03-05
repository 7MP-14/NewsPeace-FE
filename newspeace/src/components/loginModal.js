import React, { useState } from "react";

function LoginModal({ isOpen, onClose }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setError({ ...error, email: "" }); // 입력 시 에러 초기화
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        setError({ ...error, password: "" }); // 입력 시 에러 초기화
    };

    // 로그인 버튼의 onClick 이벤트
    const checkSignIn = (e) => {
        e.preventDefault();
        // 입력값 유효성 검사
        if (!validateInputs()) {
            return;
        }

        fetch(`${apiUrl}/api/login/`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                email: Email,
                password: Password,
                credentials: 'include',
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then((data) => {
            // data에서 토큰 추출
            const token = data.token;
            const userId = data.user_id;
            // 추출한 토큰을 localStorage에 저장
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user_id', userId);
            window.localStorage.setItem('is_admin', data.is_admin);
            console.log(data);
            // 로그인 성공 후 다른 동작 수행
            window.location.replace('/');
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    const validateInputs = () => {
        let isValid = true;
        const newError = {
            email: "",
            password: "",
        };

        if (!Email) {
            newError.email = "이메일을 입력하세요.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            newError.email = "올바른 이메일 형식이 아닙니다.";
            isValid = false;
        }

        if (!Password) {
            newError.password = "비밀번호를 입력하세요.";
            isValid = false;
        }

        setError(newError);
        return isValid;
    };

    return (
        <div className={isOpen ? "modal modal-open" : "modal"}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>로그인</h2>
                <form onSubmit={checkSignIn}>
                    <div className="input-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="text"
                            id="email"
                            value={Email}
                            onChange={handleEmail}
                        />
                        <span className="error">{error.email}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={Password}
                            onChange={handlePassword}
                        />
                        <span className="error">{error.password}</span>
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <div className="additional-links">
                    <a href="#">회원가입</a>
                    <a href="#">아이디/비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
