import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dummyData from "../resources/dummyData"
import {HeartFilled} from "@ant-design/icons"
export default function TweetDetail() {
    return (
        <div className='tweetDetail'>
    <div >
      {dummyData.map((e)=>{
        return(
          <div id='contentCover'>
            <div id="profile">
              <img id="profPic" src={e.imgUrl} alt="profile"/>
              <div id="name">{e.user_nickname}</div>
              <div id="userid">{`@`+ e.user_id}</div>
              <div id="createdAt">{`2022.01.08`}</div>
            </div>
            <div id="content_full">{e.content}</div>
            <div className='like'>
              <button  className="hvr-pulse" ><HeartFilled style={{color: "#e63946", fontSize: "20px"}}/></button>
            </div>
          </div>
        )
      })}
    </div>
    
  </div>

    )
}
