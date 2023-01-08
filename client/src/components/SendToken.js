import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./SendToken.css"
import axios from 'axios';
export default function SendToken() {
  const [sendInfo, setSendInfo] = useState({
    nft_recipient: "",
    nft_amount: ""
  })
  const handleInputValue=(key)=>(e)=>{
    setSendInfo({...sendInfo, [key]: e.target.value})
    console.log(sendInfo)
  }
  function validateForm(){
    return sendInfo.nft_recipient.length>0 && sendInfo.nft_amount.length>0
  }   
  function handleSubmit(event){
    let isSendSuccess=false
    event.preventDefault()
    if(sendInfo.nft_amount && sendInfo.nft_recipient){
      axios.post("http://localhost:8080/tokenTransfer", sendInfo)
      .then((res)=>{
        console.log(res.data.status)
        res.data.status==="OK"?isSendSuccess=true:isSendSuccess=false
      })
      .then(()=>{
        isSendSuccess?alert("토큰을 전송했습니다"):alert("토큰을 전송하지 못했습니다")
      }) 
  }
}
    return (
    <div className='SendToken'>
        <Form onSubmit={handleSubmit}>
        <h2>Send Token</h2>
          <div>
          <Form.Group size="lg">
            <Form.Control
              placeholder="송금할 계좌를 입력해주세요"
                        id="Tokenformbox"
                        value={sendInfo.nft_recipient}
                        type="address"
                        onChange={handleInputValue("nft_recipient")}/>
          </Form.Group>
          <Form.Group size="lg">
            <Form.Control
              placeholder="얼마나 보낼까요?"
                        id="Tokenformbox"
                        value={sendInfo.nft_amount}
                        type="amount"
                        onChange={handleInputValue("nft_amount")}/>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" disabled={!validateForm()} >
                    전송하기
          </Button>
        </Form>
    </div>
    
  );
}