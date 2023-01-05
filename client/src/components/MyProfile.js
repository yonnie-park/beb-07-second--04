import React, { useState } from 'react';
import "./MyProfile.css"
import dummyData from "../resources/dummyData"

export default function MyProfile() {
  return (
    <div className='MyProfile'>
      {dummyData.map((e)=>{
        return (
          <div className="profileContainer">
            <img src={e.imgUrl} alt="profile" id="MyProfilePic"></img>
            <h1>{e.user_nickname + `(@` + e.user_id + `)`}</h1>
            <span>0x805352d058Ad7d74F5268440fd48B2C6837F6a33</span>
          </div>
        )
      })}
    </div>
    
  );
}
