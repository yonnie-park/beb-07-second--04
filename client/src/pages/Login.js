import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
export default function Login() {
    const [id, setId]=useState("")
    const [password, setPassword]=useState("")
    return(
         <div className="container">
            <div className="join">
                <form className="form">
                    <input className="inputBox" type="text" value={id} placeholder="아이디를 입력하세요" />
                    <input className="inputBox" type="text" value={password} placeholder="비밀번호를 입력하세요" />
                    <button>로그인</button>
                </form>
            </div>
        </div>
    )
}