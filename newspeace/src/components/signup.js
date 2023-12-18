import styled from "styled-components";
import {React, useState,  useCallback} from "react";
import '../css/signup.css';
import backimg from "../img/bg-masthead.jpg";
import backgroundColor from'../img/z.png';
import logo from'../img/logo.png';

export default function Signin(props) {
    const [Name, setName]=useState();
    const [Email, setEmail]=useState();
    const [Password, setPassword]=useState();
    const [PhoneNumber, setPhoneNumber]=useState();

    const [checkedInputs, setCheckedInputs] = useState([]);
    const [nextSignupState, setNextSignupState] = useState(false);

    const handleEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
      };
    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    };
    const handleName = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };
    const handlePhoneNumber = (event) => {
        event.preventDefault();
        setPhoneNumber(event.target.value);
    };
    // 회원가입 버튼의 onClick이벤트
    const checkSignUp = (e) => {

        if (
            checkedInputs.includes('usingListCheck') &&
            checkedInputs.includes('personalInfoCheck')
            ) 
            {
            setNextSignupState(true);
            e.preventDefault();
            const formData = new FormData();
            formData.append("email", Email);
            formData.append("name", Name);
            formData.append("phone", PhoneNumber);
            formData.append("Password", Password);
        
            fetch("API 주소", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
            })
            .then((response) => {
                if (response.ok === true) {
                return response.json();
                }
                throw new Error("에러 발생!");
            })
            .catch((error) => {
                alert(error);
            })
            .then((data) => {
                console.log(data);
            });
                } 
        else {
            alert('[필수]약관을 모두 동의 해주셔야 가입절차가 진행됩니다.');
            }
        
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

            {/* <!-- Sign In --> */}
            <div class="signin_container__form signin_container--signin">
                <form action="#" class="form" id="form1">
                <h2 class="form__title">Sign Up</h2>
                <input type="text" placeholder="User Name" class="input" onChange={handleName}/>
                <input type="email" placeholder="Email" class="input" onChange={handleEmail}/>
                <input type="password" placeholder="Password" class="input" onChange={handlePassword}/>
                <input type="chkpassword" placeholder="Check Password" class="input" />
                <input type="phone" placeholder="Phone Number" class="input" onChange={handlePhoneNumber}/>

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
                    <button class="signin_btn" onClick={checkSignUp}>Sign Up</button>
                </form>
            </div>

            {/* <!-- Overlay --> */}
            <div class="signin_container__overlay">
                <div class="overlay">
                <div class="overlay__panel overlay--left">
                    <img src={logo}></img>

                    {/* <button class="signin_btn" id="signIn" >Sign In</button> */}
                </div>
                <div class="overlay__panel overlay--right">
                    <img src={logo}></img>

                     {/* <button class="signin_btn" id="signUp">Sign Up</button> */}
                </div>
                </div>
            </div>
        </div>
        
  
     </div>
    
  );
}


