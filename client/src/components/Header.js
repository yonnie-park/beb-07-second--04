import React, {useState} from "react";
import { Link} from "react-router-dom";
import "./Header.css"




export default function Header(props){

    const [account, setAccount]=useState("")
    
    const [isConnected, setIsConnected]=useState(false)




    return(
        <div className="header">
                <div className="logoDiv"><Link to="/" onClick="location.reload();" className="mainlogo">SNORLAX</Link></div>
                <div className="mypageDiv"><Link to="/mypage" className="menu">my page</Link></div>
                
                <div className="loginDiv"><Link to="/login"><button className="loginBTN">Login</button></Link></div>
                    
                <div className="signupDiv"><Link to="/signup"><button className="joinBTN">Sign up</button></Link></div>
        </div>
    )
}