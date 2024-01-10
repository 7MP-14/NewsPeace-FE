import styled from "styled-components";
import React from "react";
import '../css/header.css';

const StyledFooter = styled.footer`
  background-color: #F0F0F0;
  border-top-left-radius: 5rem; 
  border-top-right-radius: 5rem; 
  `;

export default function Footer(props) {
  return (
    <StyledFooter className="footer" style={{ backgroundColor: '#F0F0F0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
            <ul className="list-inline mb-2">
              {/* <li className="list-inline-item"><a href="#!">About</a></li>
              <li className="list-inline-item">⋅</li> */}
              <li className="list-inline-item"><a href="https://pf.kakao.com/_WMDwG">Contact</a></li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item"><a href="/termofuse">Terms of Use</a></li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item"><a href="/privacypolicy">Privacy Policy</a></li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">Copyright&copy; 2023-2024 by NewsPeace. All Rights Reserved.</p>
          </div>
          {/* <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-4">
                <a href="#!"><i className="bi-facebook fs-3"></i></a>
              </li>
              <li className="list-inline-item me-4">
                <a href="#!"><i className="bi-twitter fs-3"></i></a>
              </li>
              <li className="list-inline-item">
                <a href="#!"><i className="bi-instagram fs-3"></i></a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </StyledFooter>
  );
}