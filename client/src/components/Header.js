import React, {useState} from "react";
import { Link} from "react-router-dom";
import "./Header.css"
import axios from "axios";

export default function Header(props){

    const [account, setAccount]=useState("")
    const [isConnected, setIsConnected]=useState(false)

    function handleConnection(){
        if (props.length>0){
            setIsConnected(true)
            setAccount(props.user_id)
        }
    }
    function handleLogout(){
        axios.get("http://localhost:8080/logout")
        .then(setIsConnected(false))
    }
    return(
        <div className="header">
                <div className="logoDiv"><Link to="/" onClick="location.reload();" className="mainlogo">SNORLAX</Link></div>
                <div className="mypageDiv"><Link to="/mypage/:account" className="menu" account={account}>my page</Link></div>
                <div className="loginDiv"> {isConnected? <Link to="/"><button className="loginBTN" onClick={handleLogout()}>Logout</button></Link> : <Link to="/login"><button className="loginBTN" onClick={handleConnection()}>Login</button></Link>}</div>
                {isConnected? console.log("connected"):<div className="signupDiv"><Link to="/signup"><button className="joinBTN">Sign up</button></Link></div>}
        </div>
    )
}