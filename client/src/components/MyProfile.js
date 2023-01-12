import React, { useEffect, useState } from 'react';
import "./MyProfile.css"
import axios from 'axios';

export default function MyProfile() {
  //axios post /mypage
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    user_nickname: "",
    user_profileImg: "",
    user_accountAddress: ""
  })

  useEffect(()=>{
    axios.post("http://localhost:8080/mypage")
    .then((res)=>{
      setUserInfo(res.data)
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
