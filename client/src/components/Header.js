import React, {useContext} from "react";
import { Link, Navigate} from "react-router-dom";
import "./Header.css"
import axios from "axios";
import {UserContext} from "../UserContext"
import {useNavigate} from "react-router-dom"

export default function Header(){

    const {account, setAccount} = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = async () => {
        await axios
            .get("http://localhost:8080/logout")
            .then(setAccount({user_id: account.user_id, user_password: account.user_password, isConnected: false}))
            .then(navigate("/"))
    }
    return(
        <div className="header">
                <div className="logoDiv"><Link to="/" onClick="location.reload();" className="mainlogo">SNORLAX</Link></div>
                {/* {account.isConnected? <Link to="/"><button className="loginBTN" onClick={handleLogout()}>Logout</button></Link>:console.log("disconnected")} */}
                {account.isConnected? 
                <div className="signupDiv">
                        <Link to="/mypage/:account" className="menu" account={account.user_id}>Mypage</Link>
                        <button className="loginBTN" onClick={handleLogout}>Logout</button>
                </div>:
                <div className="signupDiv">
                    <Link to="/login"><button className="loginBTN">Login</button></Link>
                    <Link to="/signup"><button className="joinBTN">Sign up</button></Link>
                </div>}
        </div>
    )
}