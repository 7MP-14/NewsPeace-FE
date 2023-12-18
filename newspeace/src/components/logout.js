import { useEffect } from "react";
function LogoutButton() {
 
    useEffect(()=>{
      const token = window.localStorage.getItem('token');
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/logout/',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        access_token:token
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      localStorage.clear()
      window.location.replace("/")
      console.log('로그아웃 했습니다.')
    })
    });
}

export default LogoutButton;