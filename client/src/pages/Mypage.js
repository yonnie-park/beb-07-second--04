import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NFTscroll from "../components/NFTscroll";
import MyProfile from "../components/MyProfile";
import SendToken from "../components/SendToken";
import MintNFT from "../components/MintNFT";
import TweetList from "../components/TweetList"


export default function Mypage() {
    return(
        <div className="container">
            <MyProfile/>
            <SendToken/>
            <MintNFT/>
            <NFTscroll/>
            <TweetList/>
        </div>
    )
}