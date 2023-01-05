import React, { useState } from 'react';
import dummyData from "../resources/dummyData"
import {HeartFilled} from "@ant-design/icons"
import "./Tweet.css"
import axios from "axios"

export default function Tweet() {
  const [isChecked, setIsChecked] = useState(false)

  function clickHeart(){
    setIsChecked(true)
  }

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
              <div className='like'>
                <button onClick={clickHeart} className="hvr-pulse" ><HeartFilled style={{color: "#e63946", fontSize: "20px"}}/></button>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
    
  );
}
