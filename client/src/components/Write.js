import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dummyData from "../resources/dummyData"
import "./Write.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Write() {
  const notify = () => toast.success("포스트를 완료했습니다");
  const [tweetInfo, setTweetInfo] = useState({
    post_userImg: "", // 게시글 작성자 이미지
    post_ID:"", // 작성자 ID
    post_likes:"",
    post_contents:"", // 내용
    ID:"", // 게시물 번호 
    post_createdAt:"" // 게시물 작성시간
  });

  const handleChange = (key) => (event)=> {
    setTweetInfo({...tweetInfo, [key]:event.target.value});
  }

  const handleSubmit = (event) => {
    
    let isPostSuccess = false
    // event.preventDefault(); 
    if(tweetInfo.post_contents){
      console.log(tweetInfo);
      axios.post("http://localhost:8080/posts/upload", tweetInfo)
      notify()
      .then((result)=>{
        console.log(result.data.status)
        result.data.status==="success"? isPostSuccess=true : isPostSuccess=false
      })
      .then(()=>{
        isPostSuccess ? window.location.reload() : console.log()
        
      })
    }
  }
  function validateForm(){
    return tweetInfo.post_contents.length>0
}
  return (
    <div className='write'>
      <div >
          return(
            <div id='profile'>
              {/* <img id="profPic" onChange={handleChange("post_userImg")} alt="profile"/> */}
              <div id="userid" ></div>
            </div>
          )
      </div>
      <div id="tweetForm">
        <form onSubmit={handleSubmit} id="form" autofocus>
          <textarea placeholder="write something..." value={tweetInfo.post_contents} onChange={handleChange("post_contents")} id="tweetbox"/>
          <button type="submit" id="tweetBTN" disabled={!validateForm()}>post</button>
        </form>
      </div>
      <ToastContainer />
    </div>
    
  );
}
