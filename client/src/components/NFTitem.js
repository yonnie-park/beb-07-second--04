import React, {useContext, useEffect} from "react";
import "./NFTitem.css";
import { UserContext } from "../UserContext";
const NFTitem = (e) => {
    const {setProfilePic} = useContext(UserContext)
    function changeProfile(e){
        setProfilePic(e)
    }
    return(
        <div>
            <div id="itemContainer" onClick={()=>{changeProfile(e.imgUrl)}}>
                <img src={e.imgUrl} id="thumbnail" alt="item img"></img>
                <h4 id="NFTcollection">{e.collection}</h4>
                <h4 id="NFTname">{e.name}</h4>
                <p id="NFTprice">{e.price}</p>
            </div>
        </div>
        
        
    )
}

export default NFTitem;