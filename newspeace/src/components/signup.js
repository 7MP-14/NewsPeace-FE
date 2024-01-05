import styled from "styled-components";
import { React, useState, useCallback } from "react";
import '../css/signup.css';
import logo from '../img/logo2.png';

const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 3px;
  text-align: left;
`;

export default function Signin(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [nextSignupState, setNextSignupState] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
    phoneNumber: "",
  });

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setError({ ...error, email: "" }); // 입력 시 에러 초기화
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setError({ ...error, password: "" }); // 입력 시 에러 초기화
  };

  const handleName = (event) => {
    setName(event.target.value);
    setError({ ...error, name: "" }); // 입력 시 에러 초기화
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
    setError({ ...error, phoneNumber: "" }); // 입력 시 에러 초기화
  };

  const handleCheckPassword = (event) => {
    setCheckPassword(event.target.value);
    setError({ ...error, checkPassword: "" }); // 입력 시 에러 초기화
  };

  const onCheckHandler = useCallback((checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      console.log('체크 반영 완료');
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      console.log('체크 해제 반영 완료');
    }
  });



  // 회원가입 버튼의 onClick이벤트
  const checkSignUp = (e) => {
    e.preventDefault();
    // 입력값 유효성 검사
    if (!validateInputs()) {
      return;
    }
    if (checkedInputs.includes('usingListCheck') && checkedInputs.includes('personalInfoCheck')) {
      setNextSignupState(true);
      e.preventDefault();

      fetch(`${apiUrl}/api/register/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          email: Email,
          name: Name,
          phone_number: PhoneNumber,
          password: Password,
          password2: checkPassword,
          credentials: 'include',

        }),
      })
      .then((response) => {
        if (!response.ok) {
            throw new Error('signup failed');
        }
        return response.json();
        })
        .then((data) => {
            window.location.replace('/login');
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    else {
      alert('[필수]약관을 모두 동의 해주셔야 가입절차가 진행됩니다.');
    }

  };

  const validateInputs = () => {
    let isValid = true;
    const newError = {
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      phoneNumber: "",
    };

    // 각각의 유효성 검사
    if (!Name) {
      newError.name = "이름을 입력하세요.";
      isValid = false;
    }

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

    if (Password !== checkPassword) {
      newError.checkPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (!PhoneNumber) {
      newError.phoneNumber = "전화번호를 입력하세요.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  return (
    <div className="signin_body">
      <div className='signin_container'>
        {/* <!-- Sign Up --> */}
        <div class="signin_container__form signin_container--signup">
          <form action="#" class="form" id="form2">
            <h2 class="form__title">Sign In</h2>
            <input type="email" placeholder="Email" class="input" />
            <input type="password" placeholder="Password" class="input" />
            <a href="#" class="link">Forgot your password?</a>
            <button class="signin_btn">Sign In</button>

          </form>
        </div>

        {/* Sign In */}
        <div className="signin_container__form signin_container--signin">
          <div className="form">
            <h2 className="form__title">Sign Up</h2>
            <input type="text" placeholder="User Name" className="input" onChange={handleName} />
            <ErrorMsg>{error.name}</ErrorMsg>
            <input type="email" placeholder="Email" className="input" onChange={handleEmail} />
            <ErrorMsg>{error.email}</ErrorMsg>
            <input type="password" placeholder="Password" className="input" onChange={handlePassword} />
            <ErrorMsg>{error.password}</ErrorMsg>
            <input type="password" placeholder="Check Password" className="input" onChange={handleCheckPassword} />
            <ErrorMsg>{error.checkPassword}</ErrorMsg>
            <input type="text" placeholder="Phone Number" className="input" onChange={handlePhoneNumber} />
            <ErrorMsg>{error.phoneNumber}</ErrorMsg>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  id="usingListCheck"
                  onChange={(e) => {
                    onCheckHandler(e.currentTarget.checked, 'usingListCheck');
                  }}
                  checked={checkedInputs.includes('usingListCheck') ? true : false}
                />
                <p>[필수] 뉴스피스 서비스 이용약관 동의</p>
              </label>
            </div>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  id="personalInfoCheck"
                  onChange={(e) => {
                    onCheckHandler(e.currentTarget.checked, 'personalInfoCheck');
                  }}
                  checked={checkedInputs.includes('personalInfoCheck') ? true : false}
                />
                <p>[필수] 개인정보 수집 및 이용 동의</p>
              </label>
            </div>
            <button className="signin_btn" onClick={checkSignUp}>Sign Up</button>
          </div>
        </div>

        {/* <!-- Overlay --> */}
        <div class="signin_container__overlay">
          <div class="overlay">
            <div class="overlay__panel overlay--left">
              <img src={logo} style={{ width: '320px', height: '180px' }}></img>
            </div>
            <div class="overlay__panel overlay--right">
              <img src={logo} style={{ width: '320px', height: '180px' }}></img>

            </div>
          </div>
        </div>
      </div>

    </div>

  );
}
