import styled from "styled-components";
import {React, useState} from "react";
import '../css/login.css';
import backimg from "../img/bg-masthead.jpg";
import logo from'../img/logo.png';
export default function Login(props) {


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
                <input type="email" placeholder="Email" class="input" />
                <input type="password" placeholder="Password" class="input" />
                {/* <a href="#" class="link">Forgot your password?</a> */}
                <button class="login_btn">Sign In</button>
                </form>
            </div>

            {/* <!-- Overlay --> */}
            <div class="login_container__overlay">
                <div class="overlay">
                <div class="overlay__panel overlay--left">
                    <img src={logo}></img>
                    {/* <button class="login_btn" id="signIn" >Sign In</button> */}
                </div>
                <div class="overlay__panel overlay--right">
                    <img src={logo}></img>

                     {/* <button class="login_btn" id="signUp">Sign Up</button> */}
                </div>
                </div>
            </div>
        </div>
  
     </div>
    
  );
}


