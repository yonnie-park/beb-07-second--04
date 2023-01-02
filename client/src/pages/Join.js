import { React, useState, useEffect, useRef } from "react";

export default function Join() {
    const [id, setId]=useState("")
    const [password, setPassword]=useState("")
    const [passwordCheck, setPasswordCheck]=useState("")

    
    return(
        <div className="container">
            <div className="join">
                <form className="form">
                    <input className="inputBox" type="text" value={id} placeholder="아이디를 입력하세요" />
                    <input className="inputBox" type="text" value={password} placeholder="비밀번호를 입력하세요" />
                    <input className="inputBox" type="text" value={passwordCheck} placeholder="비밀번호 확인 입력하세요" />
                    <button>회원가입</button>
                </form>
            </div>
        </div>
    )
}