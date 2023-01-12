import React, { useState } from "react";
import { HeartFilled } from "@ant-design/icons";
import "./Tweet.css";
import { useNavigate } from "react-router-dom";

export default function Tweet(props) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  function clickHeart() {
    setIsChecked(true);
  }

  const tweetClick = (postId, createdAt, contents, likes) => {
    navigate("/view", { state: { postId, createdAt, contents, likes } });
  };

  return (
    <div
      className="tweet"
      onClick={() => {
        tweetClick(
          props.post_ID,
          props.post_createdAt,
          props.post_contents,
          props.post_likes
        );
      }}
    >
      <div id="contentCover">
        <div id="profile">
          <img id="profPic" src={props.post_userImg} alt="profile" />
          <div id="userid">{`@` + props.post_ID}</div>
          <div id="createdAt">{props.post_createdAt}</div>
        </div>
        <div id="content">{props.post_contents}</div>

        <div className="like">
          <button onClick={clickHeart} className="hvr-pulse">
            <HeartFilled style={{ color: "#e63946", fontSize: "20px" }} />
            {props.post_likes}
          </button>
        </div>
      </div>
    </div>
  );
}
