import { React} from "react";
import "./style.css"
import "./Main.css"
import Write from "../components/Write"
import TweetList from "../components/TweetList"
export default function Main() {
    return(
        <div className="container">
            <div id="write"><Write/></div>
            <div id="contentBox">
                <TweetList/>
            </div>
            
        </div>
    )
}