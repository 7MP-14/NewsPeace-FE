import styled from "styled-components";
import {React, useState} from "react";
import '../css/mypage.css';
import backimg from "../img/bg-masthead.jpg";
import icon1 from '../img/사용자.png';

export default function Mypage(props) {


  return (
    <div>
    <div className="mypage_body">
        <div class='my_title'>정솔 님, 안녕하세요!</div>
        <div className='mypage_container'>
            {/* <!-- My Page --> */}
            <div class="mypage_container__form mypage_container">
                
                <h2 class="form__title" >My Page</h2>
                <div class='subindex_item'>
                   <div class='subindex_titlebox'>
                       <div class='myprofile'>
                            <div class='myphoto'>
                                <div class="col-auto"><img src={icon1} style={{width:'40px', height:'37px'}}></img></div>
                            </div>
                           <div class='info_title'>
                               <h3 class='title_text'>기본 정보</h3>
                           </div>
                           <div class='myaccount'>
                               <div class='myname'>
                                   <div class='name_text'>정솔</div>
                               </div>
                               <div class='myaddress'>jeongsol@naver.com</div>
                           </div>
                       </div> 
                   </div>
            
                   <div class='subindex_item'>
                       <div class='head_title'>
                           <h3 class='subindex_title'>관심 키워드</h3>
                       </div>
                       <div class='subindex_box'>
                           <div class='fovorite_item_1'>
                               <div class='item_text'>정치</div>
                           </div>
                           <div class='fovorite_item_2'>
                               <div class='item_text'>경제</div>
                           </div>
                       </div>
                   </div>
                   <div class='subindex_scrap'>
                       <div class='scrap_title'>
                            <h3 class='subindex_title'>스크랩 기사</h3>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
    </div>   
    );
};