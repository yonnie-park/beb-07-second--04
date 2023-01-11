import React, {useState, useContext} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./Login.css"
import "./style.css"
import {UserContext} from "../UserContext"

axios.defaults.withCredentials = true;

export default function Login() {
    const {account, setAccount} = useContext(UserContext)

    const handleInputValue = (key) => (e) => {
        setAccount({...account, [key]: e.target.value})
    }
    function validateForm(){
        return account.user_id.length>0 && account.user_password.length>0
    }
    const navigate = useNavigate()

    function handleSubmit(event){
    
        event.preventDefault();
        if(account.user_id && account.user_password){
            axios.post("http://localhost:8080/login", account)
            .then((result) => {
                console.log(result.data.status)
                if(result.data.status==="success") {
                    setAccount({user_id: account.user_id, user_password: account.user_password, isConnected: "true"})}
                    console.log(account);
            })
            .then(() => {
                if(account.isConnected === "true"){
                    console.log(account.isConnected)
                    navigate("/");
                }})
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
                        value={account.user_id} 
                        onChange={handleInputValue("user_id")}/>
                </Form.Group>
                <Form.Group size="lg">
                    <Form.Control
                        placeholder="비밀번호를 입력해주세요"
                        id="formbox" 
                        type="password"
                        value={account.user_password}
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