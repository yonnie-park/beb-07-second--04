import React, {useState, useContext} from "react";
import { Link} from "react-router-dom";
import "./Header.css"
import axios from "axios";
import {UserContext} from "../UserContext"

export default function Header(){

    const {account, setAccount} = useContext(UserContext)

    function handleLogout(){
        axios.get("http://localhost:8080/logout")
        // .then(setAccount({user_id: account.user_id, user_password: account.user_password, isConnected: false}))
    }
    return(
        <div className="header">
                <div className="logoDiv"><Link to="/" onClick="location.reload();" className="mainlogo">SNORLAX</Link></div>
                <div className="mypageDiv"><Link to="/mypage/:account" className="menu" account={account.user_id}>my page</Link></div>
                {/* {account.isConnected? <Link to="/"><button className="loginBTN" onClick={handleLogout()}>Logout</button></Link>:console.log("disconnected")} */}
                {account.isConnected? <div><button className="loginBTN" >Logout</button></div>:<div className="signupDiv"><Link to="/login"><button className="loginBTN">Login</button></Link><Link to="/signup"><button className="joinBTN">Sign up</button></Link></div>}
        </div>
    )
}