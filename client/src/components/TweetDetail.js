import React, { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dummyData from "../resources/dummyData"
import {HeartFilled} from "@ant-design/icons"
import axios from "axios";
// import { post } from "../../../server/router/api";

export default function TweetDetail() {
    
  const [postInfo, setPostInfo] = useState({
    post_contents: "", // 게시물 내용
    post_createdAt: "", // 게시물 시간
    post_ID: "", // 게시글 작성자 ID
    post_userImg: "", // 게시글 작성자 프로필 이미지
    post_likes: "" // 게시글 좋아요 
  })

  const handleInputValue = (key)=>(e)=>{
    setPostInfo({...postInfo, [key]:e.target.value});
  }

  
  useEffect(()=> {
    axios.get("http://localhost:8080/posts", postInfo)
    .then((result)=>{
      setPostInfo(result.data);
    })
    .catch((err)=>console.log(err))
  }, []);
  
  // function postSubmit(event){
  //   event.preventDefault();
  //   if(postInfo.post_contents){ // post 글 내용을 쓴다면
  //     axios.get("http://localhost:8080/posts", postInfo)
  //     .then((result)=>{
  //       setPostInfo(result.data);
  //     })
  //     .catch((err)=>console.log(err))
  //   }
  // } 
  
  
  // DB에 있는 정보들을 그대로 출력
  return (
        <div className='tweetDetail'>
    <div> 
        return(
          <div id='contentCover'>
            <div id="profile">
              <img id="profPic" value={postInfo.post_userImg} alt="profile"/> {/* ipfs URL */}
              <div id="userid" value={postInfo.post_ID}></div>
              <div id="createdAt" value={postInfo.post_createdAt}></div>
            </div>
            <div id="content_full" value={postInfo.post_contents}></div>
            <div className='like'>
              <button value={postInfo.post_likes} className="hvr-pulse" ><HeartFilled style={{color: "#e63946", fontSize: "20px"}}/></button>
            </div>
          </div>
        )

    </div>
  </div>

    )
}
