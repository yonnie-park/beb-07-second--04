import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import "./Footer.css"
import github from "../assets/github.png"

export default function Footer(){
    return(
        <div className="Footer">
            <h3>Post to Earn!</h3>
            <p> We are a Web3 based community where users can earn tokens by writing posts and gaining likes. </p>
            <a href="https://github.com/codestates-beb/beb-07-second--04"><img id="githublogo" src={github} alt="logo"/></a>
        </div>
    )
}