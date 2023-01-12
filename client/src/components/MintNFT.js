import React, { useState } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./MintNFT.css"
import axios from 'axios';
import { Buffer } from 'buffer';
import {create} from 'ipfs-http-client';
import Box from '@mui/material/Box';

const projectId = '2JULpqFvMACL4Y7410ulfOmqmVF';   // <---------- your Infura Project ID

const projectSecret = '6a9b6c22ef56d8525a14ccdce315c40e';  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export default function MintNFT() {
  // const notify = () => toast.success("토큰을 전송했습니다");
  const [mintNFT, setMintNFT]=useState({
    nft_name: "",
    nft_imgURL: ""
  })
  const [imgFile, setImgFile] = React.useState(null);

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: auth
    }
  })

  // ipfs 메타데이터 생성 함수들
  const submitImage = async () => {
        
    if(!imgFile) return false;
    // console.log(imgFile);
    try{
      let added = await client.add(
        imgFile,
        {
            progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      // console.log(added);
      const url = `https://making.infura-ipfs.io/ipfs/${added.path}`;
      console.log(url)
      setMintNFT({nft_name:mintNFT.nft_name, nft_imgURL:url});
      return url;
    }catch(e){
      console.log(e)
    }
  }

  const handleImgChange = (e)=>{
    const curImgFile = e.target.files[0];
    // console.log(curImgFile);
    const reader = new FileReader();
    reader.readAsDataURL(curImgFile);
    reader.onload = function() {
        setImgFile(reader.result);
    }
  }

  const handleClickCreate = async ()=>{
    // console.log(name, imgFile);
    if((mintNFT.nft_name == '' || imgFile == null)) { console.log('input is not sain'); return false; }
    submitImage()
  }

  const handleInputValue=(key)=>(e)=>{
    setMintNFT({...mintNFT, [key]: e.target.value})
    console.log(mintNFT)
  }
  function validateForm(){
    return mintNFT.nft_name.length>0 && imgFile != null;
  }   
  function handleSubmit(event){
    let isMintSuccess=false
    
    event.preventDefault();
    handleClickCreate();
    console.log(mintNFT);
    if(mintNFT.nft_imgURL && mintNFT.nft_name){
      axios.post("http://localhost:8080/makeNFT", mintNFT)
      .then((res)=>{
        console.log(res.data.status)
        res.data.status==="success"?isMintSuccess=true:isMintSuccess=false
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
            {/* <Form.Control
              placeholder="민팅할 이미지 주소를 입력하세요"
                        id="Tokenformbox"
                        value={mintNFT.ipfs_img_url}
                        onChange={handleInputValue("ipfs_img_url")}
                        type="address"/> */}
            <Box component="span" >
                <div className="preview">
                    {imgFile && <img src={imgFile} alt="preview-img" />}
                </div>
                
                <input
                    type='file'
                    onChange={handleImgChange}
                />
            </Box>
          </Form.Group>
          </div>
          <Button 
                    id="sendBTN" size="lg" type="submit" disabled={!validateForm()}>
                    Mint
          </Button>
        </Form>
        {/* <ToastContainer/> */}
    </div>
    
  );
}
