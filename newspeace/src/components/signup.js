import styled from "styled-components";
import {React, useState} from "react";
import '../css/signup.css';
import backimg from "../img/bg-masthead.jpg";
import backgroundColor from'../img/z.png';
import logo from'../img/logo.png';

export default function Signin(props) {


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
                <input type="text" placeholder="User Name" class="input" />
                <input type="email" placeholder="Email" class="input" />
                <input type="password" placeholder="Password" class="input" />
                <input type="chkpassword" placeholder="Check Password" class="input" />
                <input type="phone" placeholder="Phone Number" class="input" />


                <button class="signin_btn">Sign Up</button>
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


