import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./MintNFT.css"
export default function MintNFT() {
  function handleSubmit(){
    console.log()
  }
    return (
    <div className='mintNFT'>
          <Form onSubmit={handleSubmit}>
          <h2>Mint NFT</h2>
          <div>
          <Form.Group size="lg">
            <h5>name</h5>
            <Form.Control
              placeholder="NFT 제목을 입력하세요"
                        id="Tokenformbox"
                        type="title"/>
          </Form.Group>
          <h5>image address</h5>
          <Form.Group size="lg">
            <Form.Control
              placeholder="민팅할 이미지 주소를 입력하세요"
                        id="Tokenformbox"
                        type="address"/>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" >
                    Mint
          </Button>
        </Form>
    </div>
    
  );
}
