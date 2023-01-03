import React, {useState} from 'react';
import './Tweet.css';

const Tweet = ({ tweet }) => {
  return (
    <li className="tweet" id={tweet.user_id}>
      <div className="tweet__profile">
        <img src={tweet.imgUrl} alt="userprofile" />
      </div>
      <div className="tweet__content">
        <div className="tweet__userInfo">
          <div className="tweet__userInfo--wrapper">
            <span className='tweet__username'>{tweet.user_nickname}</span>
          </div>
        </div>
        <div >
            <span className="tweet__message">{tweet.content}</span>
        </div>
      </div>
    </li>
  );
};

export default Tweet;
