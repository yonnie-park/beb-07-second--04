import React, { useEffect, useState } from 'react';
import dummyData from "../resources/dummyData"
import {HeartFilled} from "@ant-design/icons"
import "./Tweet.css"
import axios from "axios"
import {Link} from "react-router-dom";

export default function Tweet() {
  const [isChecked, setIsChecked] = useState(false)
  
  const [postInfo, setPostInfo] = useState({
    post_contents: "", // 게시물 내용
    post_createdAt: "", // 게시물 시간
    post_ID: "", // 게시글 작성자 ID
    post_userImg: "", // 게시글 작성자 프로필 이미지
    post_likes: "" // 게시글 좋아요 
  })

  function clickHeart(){
    setIsChecked(true)
  }

  useEffect(()=> {
    axios.get("http://localhost:8080/posts", postInfo)
    .then((result)=>{
      setPostInfo(result.data);
    })
    .catch((err)=>console.log(err))
  }, []);

  
  return (
    <Link to="/view" id='tweetComponent'>
    <div className='tweet'>
    <div >
        return(
          <div id='contentCover'>
            <div id="profile">
              <img id="profPic" value={postInfo.post_userImg} alt="profile"/>
              <div id="userid" value={postInfo.post_ID} ></div>
              <div id="createdAt"value={postInfo.post_createdAt}></div>
            </div>
            <div id="content" value={postInfo.post_contents}></div>
            
            <div className='like'>
              <button onClick={clickHeart} className="hvr-pulse" ><HeartFilled style={{color: "#e63946", fontSize: "20px"}}/></button>
            </div>
          </div>
        )
    </div>
    
  </div></Link>
    
  );
}
