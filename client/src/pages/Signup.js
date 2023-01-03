import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import "./Signup.css"
axios.defaults.withCredentials = true;

export default function Signup() {
    const [userInfo, setuserInfo]=useState({
        user_id: "",
        user_password: "",
        user_nickname: ""
    })
    const handleInputValue=(key)=>(e)=>{
        setuserInfo({...userInfo, [key]:e.target.value})
    }
    const navigate=useNavigate()
    const [passwordCheck, setPasswordCheck]=useState("")
    
    function validateForm(){
        return userInfo.user_id.length>0 && userInfo.user_nickname.length>0 && userInfo.user_password.length>0 && userInfo.user_password===passwordCheck
    }

    function handleSubmit(event){
        let isSigninSuccess = false
        event.preventDefault();
        if(
            userInfo.user_id &&
            userInfo.user_password &&
            userInfo.user_nickname
        ){
            axios.post("http://localhost:8080/signUp", userInfo)
            .then((result)=>{
                console.log(result.data.status)
                result.data.status==="success"? isSigninSuccess=true : isSigninSuccess=false
            })
            .then(()=>{
                isSigninSuccess? navigate('/') : console.log("failed")
            }).catch((e)=>console.log(e))
        }
    }

    
    return(
        <div className="container">
            <div className="join">
            <Form onSubmit={handleSubmit}>
                <div id="forms">
                    <h1>create account</h1>
                    <Form.Group size="lg" controlId="username">
                        <Form.Control
                            placeholder="아이디를 입력하세요"
                            id="formbox"
                            autoFocus 
                            type="text"
                            value={userInfo.user_id} 
                            onChange={handleInputValue("user_id")} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            placeholder="비밀번호를 입력하세요"
                            id="formbox" 
                            type="password"
                            value={userInfo.user_password}
                            onChange={handleInputValue("user_password")} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            placeholder="비밀번호 확인"
                            id="formbox" 
                            type="password"
                            value={passwordCheck}
                            onChange={(e)=>setPasswordCheck(e.target.value)}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="nickname">
                        <Form.Control
                            placeholder="사용하실 닉네임을 입력하세요"
                            id="formbox"
                            autoFocus 
                            type="text"
                            value={userInfo.user_nickname} 
                            onChange={handleInputValue("user_nickname")} />
                    </Form.Group>
                    <Button 
                    id="loginBTN" size="lg" type="submit" disabled={!validateForm()}>
                        continue
                    </Button>
                </div>

            
            </Form>
            </div>
        </div>
    )
}