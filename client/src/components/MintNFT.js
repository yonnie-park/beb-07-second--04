import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./MintNFT.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MintNFT() {
  const notify = () => toast.success("토큰을 전송했습니다");
  const [mintNFT, setMintNFT]=useState({
    nft_name: "",
    ipfs_img_url: ""
  })
  const handleInputValue=(key)=>(e)=>{
    setMintNFT({...mintNFT, [key]: e.target.value})
    console.log(mintNFT)
  }
  function validateForm(){
    return mintNFT.nft_name.length>0 && mintNFT.ipfs_img_url.length>0
  }   
  function handleSubmit(event){
    let isMintSuccess=false
    event.preventDefault()
    if(mintNFT.ipfs_img_url && mintNFT.nft_name){
      notify()
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
                        value={mintNFT.ipfs_img_url}
                        onChange={handleInputValue("ipfs_img_url")}
                        type="address"/>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" disabled={!validateForm()}>
                    Mint
          </Button>
        </Form>
        <ToastContainer/>
    </div>
    
  );
}
