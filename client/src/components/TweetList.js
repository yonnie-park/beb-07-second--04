import React from "react";
import Tweet from "./Tweet.js";
import axios from "axios";
import profile_sample from "../assets/collectedImg/1.png";
import { useState, useEffect } from "react";

export default function TweetList() {
  const [postInfo, setPostInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((result) => {
        setPostInfo([...result.data.posts_list]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="TweetsContainer">
      {postInfo.map((post) => (
        <div className="Tweets" key={post.id}>
          <Tweet
            post_contents={post.post_contents}
            post_createdAt={post.post_createdAt}
            post_ID={post.post_ID}
            post_userImg={profile_sample}
            post_likes={post.post_likes}
          />
        </div>
      ))}
    </div>
  );
}
