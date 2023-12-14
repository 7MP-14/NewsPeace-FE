// import {useState, useCallback,useEffect} from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// const Signup=() =>{

//     const history=useNavigate();

//     //초기값 세팅
//     const [email, onChangeEmail, setEmail]=useState("");
//     const[name, onChangename, setName]=useState("");
//     const[nickname, onChangeNickname, setNickname]=useState("");
//     const[password, onChangePassword, setPassword]=useState("");
//     const[passwordConfirm, onChangePasswordConfirm, setpasswordConfirm]=useState("");
//     const[birth, onChangeBirth, setBirth]=useState("");
//     const[phone, onChangePhone, setPhone]=useState("");
//     const [errorMessage, setErrorMessage] = useState({
//         emailError: "",
//         nameError: "",
//         nicknameError:"",
//         passwordError: "",
//         passwordConfirmError: "",
//         birthError:"",
//         phoneError:"",
//       });
//     const { emailError, passwordError, passwordConfirmError, nicknameError,nameError,birthError, phoneError} = errorMessage;

//     const inputRegexs = {
//         emailReg:  /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
//         passwordReg: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
//       };
//       const valemailationCheck = useCallback(
//         (input, regex) => {
//           let isValemailate = false;
//           if (input === "") {
//             isValemailate = false;
//           } else if (regex.test(input)) {
//             isValemailate = true;
//           } else {
//             isValemailate = false;
//           }
//           return isValemailate;
//         },
//         [password, email]
//       );

//     const onReset = useCallback(() => {
//         setEmail("");
//         setPassword("");
//         setpasswordConfirm("");
//         setName("");
//         setNickname("");
//         setBirth("");
//         setPhone("");
//       }, [setEmail, setPassword, setpasswordConfirm,setBirth,setName,setNickname,setPhone]);
      
//       /* 아이디 체크 */
//       useEffect(() => {
//         if (valemailationCheck(email, inputRegexs.emailReg) || email === "") {
//           setErrorMessage({
//             ...errorMessage,
//             emailError: "",
//           });
//         } else {
//           setErrorMessage({
//             ...errorMessage,
//             emailError: "이메일 형식으로 입력해 주세요",
//           });
//         }
//       }, [email]);
    
//       /* 비밀번호 체크 */
//       useEffect(() => {
//         if (valemailationCheck(password, inputRegexs.passwordReg) || password === "") {
//           setErrorMessage({
//             ...errorMessage,
//             passwordError: "",
//           });
//         } else {
//           setErrorMessage({
//             ...errorMessage,
//             passwordError:
//               "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!",
//           });
//         }
//       }, [password]);
      
//       /* 비밀번호 확인 체크 */
//       useEffect(() => {
//         if (password === passwordConfirm || passwordConfirm === "") {
//           setErrorMessage({
//             ...errorMessage,
//             passwordConfirmError: "",
//           });
//         } else {
//           setErrorMessage({
//             ...errorMessage,
//             passwordConfirmError: "비밀번호 확인이 일치하지 않습니다.",
//           });
//         }
//       }, [passwordConfirm]);
    
//       const onSignUp = () => {
//         if (!email || !password || !passwordConfirm) {
//           alert("모든 값을 정확하게 입력해주세요");
//           return;
//         }

//         if (emailError) {
//           alert("이메일이 형식에 맞지 않습니다");
//           return;
//         } 
//         else if (passwordError) {
//           alert("비밀번호가 형식에 맞지 않습니다");
//           return;
//         } else if (passwordConfirmError) {
//           alert("비밀번호 확인이 일치하지 않습니다.");
//           return;
//         }
//         //e.preventDefault();
//         fetch('http://gabojago.shop/auth/signup',{
//             method:'POST',
//             headers:{ 'Content-Type': 'application/json; charset=utf-8' },
//             body:JSON.stringify({
//                 email:email,
//                 password:password,
//                 name: name,
//                 nickname:nickname,
//                 birth:birth,
//                 phone:phone
//             }),
//         })
//         .then(res=>res.json())
//         .then(data=>{console.log(data);
//             dispatch({
//                 type:"CREATE_USER",
//                 user:{
//                     email,
//                     password,
//                 },
//             });
//             alert("회원 가입 완료");
//             history('/login');
//             //history("/");
//             onReset();
//         });

        
//       };
//     // const onChangeEmail=(e)=>{
//     //     const currentEmail=e.target.value;
//     //     setEmail(currentEmail);
//     //     const emailRegExp=
//     //         /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
//     //     if (!emailRegExp.test(currentEmail)) {
//     //         setEmailMessage("이메일의 형식이 올바르지 않습니다!");
//     //         setIsEmail(false);
//     //         } else {
//     //         setEmailMessage("사용 가능한 이메일 입니다.");
//     //         setIsEmail(true);
//     //         }
//     // };

//     // const onChangeName = (e) => {
//     //     const currentName = e.target.value;
//     //     setName(currentName);
     
//     //     if (currentName.length < 2 || currentName.length > 5) {
//     //       setNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
//     //       setIsName(false);
//     //     } else {
//     //       setNameMessage("사용가능한 이름 입니다.");
//     //       setIsName(true);
//     //     }
//     //   };

//     // const onChangeNickname = (e) => {
//     // const currentNickname = e.target.value;
//     // setNickname(currentNickname);
    
//     // if (currentNickname.length < 2 || currentNickname.length > 10) {
//     //     setNicknameMessage("닉네임은 2글자 이상 10글자 이하로 입력해주세요!");
//     //     setIsNickname(false);
//     // } else {
//     //     setNicknameMessage("사용가능한 닉네임 입니다.");
//     //     setIsNickname(true);
//     // }
//     // };

//     // const onChangePassword = (e) => {
//     // const currentPassword = e.target.value;
//     // setPassword(currentPassword);
//     // const passwordRegExp =
//     //     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
//     // if (!passwordRegExp.test(currentPassword)) {
//     //     setPasswordMessage(
//     //     "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
//     //     );
//     //     setIsPassword(false);
//     // } else {
//     //     setPasswordMessage("안전한 비밀번호 입니다.");
//     //     setIsPassword(true);
//     // }
//     // };

//     // const onChangePasswordConfirm = (e) => {
//     // const currentPasswordConfirm = e.target.value;
//     // setPasswordConfirm(currentPasswordConfirm);
//     // if (password !== currentPasswordConfirm) {
//     //     setPasswordConfirmMessage("똑같은 비밀번호를 입력해주세요.");
//     //     setIsPasswordConfirm(false);
//     // } else {
//     //     setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
//     //     setIsPasswordConfirm(true);
//     // }
//     // };

//     // const onChangeBirth = (e) => {
//     // const currentBirth = e.target.value;
//     // setBirth(currentBirth);
//     // };

//     // const onChangePhone = (getNumber) => {
//     // const currentPhone = getNumber;
//     // setPhone(currentPhone);
//     // const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    
//     // if (!phoneRegExp.test(currentPhone)) {
//     //     setPhoneMessage("올바른 형식이 아닙니다!");
//     //     setIsPhone(false);
//     // } else {
//     //     setPhoneMessage("사용 가능한 번호입니다:-)");
//     //     setIsPhone(true);
//     // }
//     // };

//     // const addHyphen = (e) => {
//     // const currentNumber = e.target.value;
//     // setPhone(currentNumber);
//     // if (currentNumber.length == 3 || currentNumber.length == 8) {
//     //     setPhone(currentNumber + "-");
//     //     onChangePhone(currentNumber + "-");
//     // } else {
//     //     onChangePhone(currentNumber);
//     // }
//     // };



//     return (
//     <>
//         <h3>Sign Up</h3>
//         <div className="form">
//         <div className="form-el">
//             <label htmlFor="email">Email</label> <br />
//             <input
//             email="email"
//             name="name"
//             value={email}
//             onChange={onChangeEmail}
//             />
//             {/* <p className="message">{emailMessage}</p> */}
//             {emailError? <p>{emailError}</p>:""}
//         </div>
    
//         <div className="form-el">
//             <label htmlFor="name">Name</label> <br />
//             <input email="name" name="name" value={name} onChange={onChangename} />
//             {/* <p className="message">{nameMessage}</p> */}
//             {nameError? <p>{nameError}</p>:""}

//         </div>

//         <div className="form-el">
//             <label htmlFor="nickname">Nick Name</label> <br />
//             <input email="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
//             {/* <p className="message">{nicknameMessage}</p> */}
//             {nicknameError? <p>{nicknameError}</p>:""}

//         </div>

//         <div className="form-el">
//             <label htmlFor="password">Password</label> <br />
//             <input
//             email="password"
//             name="password"
//             value={password}
//             onChange={onChangePassword}
//             />
//             {/* <p className="message">{passwordMessage}</p> */}
//             {passwordError? <p>{passwordError}</p>:""}

//         </div>
//         <div className="form-el">
//             <label htmlFor="passwordConfirm">Password Confirm</label> <br />
//             <input
//             email="passwordConfirm"
//             name="passwordConfirm"
//             value={passwordConfirm}
//             onChange={onChangePasswordConfirm}
//             />
//             {/* <p className="message">{passwordConfirmMessage}</p> */}
//             {passwordConfirmError? <p>{passwordConfirmError}</p>:""}

//         </div>

//         <div className="form-el">
//             <label htmlFor="birth">Birth</label> <br />
//             <input
//             email="birth"
//             name="birth"
//             value={birth}
//             onChange={onChangeBirth}
//             />
//             {/* <p className="message">{birthMessage}</p> */}
//             {birthError? <p>{birthError}</p>:""}

//         </div>

//         <div className="form-el">
//             <label htmlFor="phone">Phone</label> <br />
//             <input email="phone" name="phone" value={phone} onChange={onChangePhone} />
//             {/* <p className="message">{phoneMessage}</p> */}
//             {phoneError? <p>{phoneError}</p>:""}

//         </div>
 
//         <br />
//         <br />
//         <button type="submit" onClick={onSignUp}>Submit</button>
//         </div>
//     </>
//     );
// };

// export default Signup;