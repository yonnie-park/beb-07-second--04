import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./Login.css"
import "./style.css"
axios.defaults.withCredentials = true;

export default function Login() {
    const [loginInfo, setLoginInfo] = useState({
        user_id: "",
        user_password: ""
    })   

    const handleInputValue = (key) => (e) => {
        setLoginInfo({...loginInfo, [key]: e.target.value})
    }
    function validateForm(){
        return loginInfo.user_id.length>0 && loginInfo.user_password.length>0
    }
    const navigate = useNavigate()

    function handleSubmit(event){
        let isSigninSuccess = false
        event.preventDefault();
        if(loginInfo.user_id && loginInfo.user_password){
            axios.post("http://localhost:8080/login", loginInfo)
            .then((result) => {
                console.log(result.data.status)
                result.data.status==="success" ? isSigninSuccess=true : isSigninSuccess=false
            })
            .then(() => {
                isSigninSuccess ? navigate('/') : console.log("failed")})
            .catch((e)=>console.log(e))
            
        }
    }


    return(
       <div className="container">
        <div id="forms">
            <h1>login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg">
                    <Form.Control
                        placeholder="아이디를 입력해주세요"
                        id="formbox"
                        autoFocus 
                        type="username"
                        value={loginInfo.user_id} 
                        onChange={handleInputValue("user_id")}/>
                </Form.Group>
                <Form.Group size="lg">
                    <Form.Control
                        placeholder="비밀번호를 입력해주세요"
                        id="formbox" 
                        type="password"
                        value={loginInfo.user_password}
                        onChange={handleInputValue("user_password")}/>
                </Form.Group>
                <Button 
                    id="loginBTN" size="lg" type="submit" disabled={!validateForm()}>
                    continue
                </Button>
            </Form>

        </div>
       </div> 
    )
}