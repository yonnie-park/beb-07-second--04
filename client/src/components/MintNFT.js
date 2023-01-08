import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./MintNFT.css"
import axios from 'axios';


export default function MintNFT() {
  const [mintNFT, setMintNFT]=useState({
    nft_name: "",
    nft_imageURL: ""
  })
  const handleInputValue=(key)=>(e)=>{
    setMintNFT({...mintNFT, [key]: e.target.value})
    console.log(mintNFT)
  }
  function validateForm(){
    return mintNFT.nft_name.length>0 && mintNFT.nft_imageURL.length>0
  }   
  function handleSubmit(event){
    let isMintSuccess=false
    event.preventDefault()
    if(mintNFT.nft_imageURL && mintNFT.nft_name){
      axios.post("http://localhost:8080/makeNFT", mintNFT)
      .then((res)=>{
        console.log(res.data.status)
        res.data.status==="Created"?isMintSuccess=true:isMintSuccess=false
      })
      .then(()=>{
        isMintSuccess?alert("NFT를 민팅했습니다"):alert("민팅에 실패했습니다")
      }) 
  }
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
                        value={mintNFT.nft_name}
                        onChange={handleInputValue("nft_name")}
                        type="title"/>
          </Form.Group>
          <h5>image address</h5>
          <Form.Group size="lg">
            <Form.Control
              placeholder="민팅할 이미지 주소를 입력하세요"
                        id="Tokenformbox"
                        value={mintNFT.nft_imageURL}
                        onChange={handleInputValue("nft_imageURL")}
                        type="address"/>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" disabled={!validateForm()}>
                    Mint
          </Button>
        </Form>
    </div>
    
  );
}
