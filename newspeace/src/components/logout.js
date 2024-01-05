import { useEffect } from "react";

function LogoutButton() {
 
    useEffect(()=>{
        localStorage.clear()
        window.location.replace("/")

    });
}

export default LogoutButton;