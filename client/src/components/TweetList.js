import React, { useState,useEffect } from "react";
import Tweet from "./Tweet.js"
import axios from "axios"

export default function TweetList(){

const [postInfo, setPostInfo] = useState({
    post_contents: "", // 게시물 내용
    post_createdAt: "", // 게시물 시간
    post_ID: "", // 게시글 작성자 ID
    post_userImg: "", // 게시글 작성자 프로필 이미지
    post_likes: "" // 게시글 좋아요 
      })

useEffect(()=> {
    axios.get("http://localhost:8080/posts", postInfo)
    .then((result)=>{
    setPostInfo(result.data);
    })
    .catch((err)=>console.log(err))
}, []);

return(
    // <div value={postInfo}></div> 
    <div>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>     
        </div>
    )
}