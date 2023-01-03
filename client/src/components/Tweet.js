import React, { useState } from 'react';
import dummyData from "../resources/dummyData"
import "./Tweet.css"

export default function Tweet() {
  return (
    <div className='tweet'>
      <div >
        {dummyData.map((e)=>{
          return(
            <div id='contentCover'>
              <div id="profile">
                <img id="profPic" src={e.imgUrl} alt="profile"/>
                <div id="name">{e.user_nickname}</div>
                <div id="userid">{`@`+ e.user_id}</div>
              </div>
              <div id="content">{e.content}</div>
            </div>
          )
        })}
      </div>
      
    </div>
    
  );
}
