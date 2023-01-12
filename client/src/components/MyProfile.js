import React, { useEffect, useState } from 'react';
import "./MyProfile.css"
import axios from 'axios';
import {create} from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = '2JULpqFvMACL4Y7410ulfOmqmVF';   // <---------- your Infura Project ID

const projectSecret = '6a9b6c22ef56d8525a14ccdce315c40e';  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export default function MyProfile() {
  //axios post /mypage
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    user_nickname: "",
    user_profileImg: "",
    user_accountAddress: ""
  })

  useEffect(()=>{
    axios.post("http://localhost:8080/mypage",userInfo)
    .then((res)=>{
      setUserInfo(res.data);
      console.log(res.data.user_profileImg);
      // axios.get(res.data.user_profileImg,config).then((e)=>{
      //   console.log(e);
      //   setUserInfo({user_profileImg:e.data});
      // })

    }).catch((err)=>console.log(err))
  },[])

  return (
    <div className='MyProfile'>
          <div className="profileContainer">
            <img src={userInfo.user_profileImg} alt="profile" id="MyProfilePic"></img>
            <h1>{userInfo.user_nickname + `(@` + userInfo.user_id + `)`}</h1>
            <span>{userInfo.user_accountAddress}</span>
          </div>
    </div>
    
  );
}
