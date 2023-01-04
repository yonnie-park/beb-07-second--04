import { React} from "react";
import "./style.css"
import "./Main.css"
import Write from "../components/Write"
import Tweet from "../components/Tweet"
export default function Main() {
    return(
        <div className="container">
            <div id="write"><Write/></div>
            <div id="contentBox">
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
            </div>
            
        </div>
    )
}