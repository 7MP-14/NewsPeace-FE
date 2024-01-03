import styled from "styled-components";
import {React, useState} from "react";
import '../css/login.css';
import backimg from "../img/bg-masthead.jpg";
import logo from'../img/logo2.png';


const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 3px;
  text-align: left; /* 왼쪽 정렬 스타일 추가 */
`;
export default function Login(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [Email, setEmail]=useState();
    const [Password, setPassword]=useState();

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


    // 로그인 버튼의 onClick이벤트
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
                email:Email,
                password:Password,
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
            // console.log(data.token);
            // 추출한 토큰을 localStorage에 저장
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user_id', userId);
            window.localStorage.setItem('is_admin',data.is_admin);
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
    <div className="login_body">
        <div className='login_container'>
            {/* <!-- Sign Up --> */}
            <div class="login_container__form login_container--signup">
                <form action="#" class="form" id="form1">
                <h2 class="form__title">Sign Up</h2>
                <input type="text" placeholder="User" class="input" />
                <input type="email" placeholder="Email" class="input" />
                <input type="password" placeholder="Password" class="input" />
                <button class="login_btn">Sign Up</button>
                </form>
            </div>

            {/* <!-- Sign In --> */}
            <div class="login_container__form login_container--signin">
                <form action="#" class="form" id="form2">
                    <h2 class="form__title">Login</h2>
                    <input type="email" placeholder="Email" className="input" onChange={handleEmail} />
                    <ErrorMsg>{error.email}</ErrorMsg>
                    <input type="password" placeholder="Password" className="input" onChange={handlePassword} />
                    <ErrorMsg>{error.password}</ErrorMsg>
                    {/* <a href="#" class="link">Forgot your password?</a> */}
                    <button class="login_btn" onClick={checkSignIn}>Sign In</button>
                </form>
            </div>

            {/* <!-- Overlay --> */}
            <div class="login_container__overlay">
                <div class="overlay">
                <div class="overlay__panel overlay--left">
                    <img src={logo} style={{width:'320px', height:'180px'}}></img>
                    {/* <button class="login_btn" id="signIn" >Sign In</button> */}
                </div>
                <div class="overlay__panel overlay--right">
                    <img src={logo} style={{width:'320px', height:'180px'}}></img>

                     {/* <button class="login_btn" id="signUp">Sign Up</button> */}
                </div>
                </div>
            </div>
        </div>
  
     </div>
    
  );
}


