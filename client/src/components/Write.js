import React, { useState } from 'react';
import dummyData from "../resources/dummyData"
import "./Write.css"

export default function Write() {
  const [tweet, setTweet] = useState('');

  const handleChange = (event) => {
    setTweet(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to post tweet here
    setTweet('');
  }
  function validateForm(){
    return tweet.length>0
}
  return (
    <div className='write'>
      <div >
        {dummyData.map((e)=>{
          return(
            <div id='profile'>
              <img id="profPic" src={e.imgUrl} alt="profile"/>
              <div id="name">{e.user_nickname}</div>
              <div id="userid">{`@`+ e.user_id}</div>
            </div>
          )
        })}
      </div>
      <div id="tweetForm">
        <form onSubmit={handleSubmit} id="form">
          <textarea placeholder="write something..." value={tweet} onChange={handleChange} id="tweetbox"/>
          <button type="submit" id="tweetBTN" disabled={!validateForm()}>post</button>
        </form>
      </div>
      
    </div>
    
  );
}
