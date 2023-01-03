import React from "react";
import {Link} from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css"

export default function Header(){
    return(
        <div className="header">
                <Link to="/"><img id="logo" src={logo} alt="logo"></img></Link>
                <Link to="/mypage" className="menu">My Page</Link>
            <div className="menuBTN">
                <Link to="/login"><button className="loginBTN">Login</button></Link>
                <Link to="/signup"><button className="joinBTN">Sign up</button></Link>
            </div>
        </div>
    )
}