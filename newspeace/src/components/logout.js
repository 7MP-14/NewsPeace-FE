import { useEffect } from "react";

function LogoutButton() {
 
    useEffect(()=>{
        localStorage.clear()
        window.location.replace("/")
    // const token = window.localStorage.getItem('token');

    // fetch('http://3.38.153.81/api/logout/',{
    //   method:'POST',
    //   hearders:{
    //     'Content-Type':'application/json; charset=utf-8'
    //   },
    //   body:JSON.stringify({
    //     access_token:token
    //   }),
    // })
    // .then(res=>res.json())
    // .then(res=>{
    //   localStorage.clear()
    //   window.location.replace("/")
    //   console.log('로그아웃 했습니다.')
    // })
    });
}

export default LogoutButton;