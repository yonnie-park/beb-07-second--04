import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./SendToken.css"

export default function SendToken() {
  function handleSubmit(){
    console.log()
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
                        type="address"/>
          </Form.Group>
          <Form.Group size="lg">
            <Form.Control
              placeholder="얼마나 보낼까요?"
                        id="Tokenformbox"
                        type="address"/>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" >
                    전송하기
          </Button>
        </Form>
    </div>
    
  );
}
