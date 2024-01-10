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
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [nextSignupState, setNextSignupState] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  // 개인정보 수집 및 이용 동의 내용
const privacyPolicyContent = `
개인정보 처리방침<br>
<br>
뉴스피스 서비스를 이용해 주셔서 감사합니다. 저희는 이용자의 개인정보를 매우 중요하게 생각하고 있습니다. 이에 따라 개인정보 보호를 위해 최선을 다하고 있습니다. 아래는 뉴스피스에서 수집하는 개인정보의 종류와 그 처리에 대한 안내입니다.<br>
<br>
[수집하는 개인정보의 항목]<br>
<br>
뉴스피스는 회원 가입 및 서비스 이용을 위해 다음과 같은 개인정보를 수집하고 있습니다.<br>
<br>
- 이메일 주소<br>
- 사용자 이름<br>
- 기타 회원가입에 필요한 정보<br>
- 개인정보의 수집 목적<br>
<br>
뉴스피스는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.<br>
<br>
1. 회원 가입 및 관리<br>
2. 서비스 제공 및 운영<br>
3. 이용자에게 서비스 관련 소식 전달<br>
<br>
[개인정보의 보유 및 이용 기간]<br><br>
뉴스피스는 이용자의 개인정보를 회원 탈퇴 시까지 보유하며, 서비스 이용 중 또는 서비스 제공 종료 시에는 즉시 파기됩니다.<br>
<br><br>
[개인정보의 제공 및 공유]<br><br>
뉴스피스는 이용자의 개인정보를 본인의 동의 없이 타 기업이나 제3자에게 제공하지 않습니다.<br>
  `;

  const serviceContent=`
  뉴스피스 서비스 이용약관
  <br><br>
제1조 (목적)
<br><br>
뉴스피스 서비스 이용약관(이하 '약관')은 뉴스피스(이하 '회사')가 제공하는 뉴스피스 서비스(이하 '서비스')를 이용함에 있어 회사와 이용자 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
<br><br>
제2조 (약관의 효력과 변경)
<br><br>
약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
<br>
회사는 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 효력을 발생합니다.
<br><br>
제3조 (이용계약의 체결)
<br><br>
이용계약은 이용자가 약관의 내용에 동의하고 회사의 가입 양식에 기재하여 가입신청을 함으로써 체결됩니다.
<br>
회사는 이용자가 아래의 각 호에 해당하는 경우 가입신청을 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
<br>
가. 실명이 아니거나 타인의 명의를 이용하여 신청한 경우
<br>
나. 허위의 정보를 기재하거나 회사가 요청하는 내용을 기재하지 않은 경우
<br>
다. 다른 사람의 회원계정 및 비밀번호를 도용한 경우
<br>
라. 사회의 안녕과 질서 혹은 미풍양속을 저해할 목적으로 서비스를 이용하고자 하는 경우
<br>
<br>
제4조 (서비스의 제공 및 변경)
<br><br>
회사는 이용자에게 서비스를 제공합니다.
<br>
회사는 서비스의 성능을 유지, 보수, 개선하는 등의 목적으로 서비스의 전부 또는 일부를 수정, 변경 또는 중단할 수 있습니다.
<br>
<br>
제5조 (개인정보의 보호)
<br><br>
회사는 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 수집, 이용, 저장, 제공, 관리 등에 대한 사항은 개인정보처리방침에 따릅니다.
<br>
개인정보처리방침은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
<br><br>
제6조 (서비스 이용 시간)
<br><br>
서비스 이용 시간은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 24시간을 원칙으로 합니다.
<br>
서비스 일부는 정기적인 점검 등의 이유로 일시적으로 이용이 중단될 수 있으며, 이러한 경우 회사는 사전에 공지합니다.
<br>

<br>
본 약관은 뉴스피스와 이용자 간의 서비스 이용에 관한 중요한 규정이므로 주의 깊게 읽어주시기 바랍니다.`
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  
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
    // 체크박스에 따라 내용 설정
    if (id === 'usingListCheck') {
      setTermsContent(
        <div dangerouslySetInnerHTML={{ __html: serviceContent }} />
      );
    } else if (id === 'personalInfoCheck') {
      setPrivacyContent(
        <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
      );
    }
  }, [checkedInputs, setTermsContent, setPrivacyContent]);



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
            <div className="checkbox-container">
              <label>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="usingListCheck"
                    onChange={(e) => {
                      onCheckHandler(e.currentTarget.checked, 'usingListCheck');
                    }}
                    checked={checkedInputs.includes('usingListCheck') ? true : false}
                  />
                  
                  <p>[필수] 뉴스피스 서비스 이용약관 동의</p>
                </div>
                </label>
                {checkedInputs.includes('usingListCheck') && (
                  <div className="scroll-box">
                    {termsContent}
                  </div>
                )}
              
            </div>

            <div className="checkbox-container">
              <label>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="personalInfoCheck"
                    onChange={(e) => {
                      onCheckHandler(e.currentTarget.checked, 'personalInfoCheck');
                    }}
                    checked={checkedInputs.includes('personalInfoCheck') ? true : false}
                  />
                  <p>[필수] 개인정보 수집 및 이용 동의</p>
                </div>
                </label>
                {checkedInputs.includes('personalInfoCheck') && (
                  <div className="scroll-box">
                    {privacyContent}
                  </div>
                )}
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
