import React, { useState } from "react";
import {HeartFilled} from "@ant-design/icons"
import { useLocation } from 'react-router-dom';
import profile_sample from "../assets/collectedImg/1.png";
// import { post } from "../../../server/router/api";

export default function TweetDetail() {
  const [postInfo, setPostInfo] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();

  const postId = location.state.postId;
  const createdAt = location.state.createdAt;
  const contents = location.state.contents;
  const likes = location.state.likes;

  function clickHeart() {
    setIsChecked(true);
  }

  const handleInputValue = (key)=>(e)=>{
    setPostInfo({...postInfo, [key]:e.target.value});
  }
  
  // DB에 있는 정보들을 그대로 출력
  return (
        <div className="tweet">
        <div id="contentCover">
        <div id="profile">
          <img id="profPic" src={profile_sample} alt="profile" />
          {/* <div id="name">{"Nickname sample"}</div> */}
          <div id="userid">{`@` + postId}</div>
          <div id="createdAt">{createdAt}</div>
        </div>
        <div id="content">{contents}</div>

        <div className="like">
          <button onClick={clickHeart} className="hvr-pulse">
            <HeartFilled
              style={{ color: "#e63946", fontSize: "20px" }}
            />
            {likes}
          </button>
        </div>
      </div>
      </div>

    )
}
