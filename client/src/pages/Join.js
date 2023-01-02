import { React, useState, useEffect, useRef } from "react";

export default function Join() {

    return(
        <div className="container">
            <div className="join">
                <form className="form">
                    <input className="inputBox" type="text" placeholder="아이디를 입력하세요" />
                    <input className="inputBox" type="text" placeholder="비밀번호를 입력하세요" />
                    <input className="inputBox" type="text" placeholder="비밀번호 확인 입력하세요" />
                    <button>회원가입</button>
                </form>
            </div>
        </div>
    )
}