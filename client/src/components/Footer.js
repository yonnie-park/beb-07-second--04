import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import "./Footer.css"
import github from "../assets/github.png"
import first from "../assets/1.png"
import second from "../assets/2.png"
import third from "../assets/3.png"
import fourth from "../assets/4.png"

export default function Footer(){
    return(
        <div className="Footer">
            <h3>Post to Earn!</h3>
            <p> We are a Web3 based community where users can earn tokens by writing posts and gaining likes. </p>
            <a href="https://github.com/codestates-beb/beb-07-second--04"><img id="githublogo" src={github} alt="logo"/></a>
            <p>👇 check out our github 👇</p>
            <div>
                <a href="https://github.com/2h-Song"><img id="emoji" className="hvr-grow" src={fourth} alt="logo"/></a>
                <a href="https://github.com/NotoriousHong"><img id="emoji" className="hvr-grow" src={second} alt="logo"/></a>
                <a href="https://github.com/yonnie-park"><img id="emoji" className="hvr-grow" src={first} alt="logo"/></a>
                <a href="https://github.com/Beomhyuck"><img id="emoji" className="hvr-grow" src={third} alt="logo"/></a>
            </div>
        </div>
    )
}