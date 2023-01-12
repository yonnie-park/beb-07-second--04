import React from "react";
import "./NFTitem.css";

const NFTitem = (e) => {
    return(
        <div>
            <div id="itemContainer">
                <img src={e.imgUrl} id="thumbnail" alt="item img"></img>
                <h4 id="NFTcollection">{e.collection}</h4>
                <h4 id="NFTname">{e.name}</h4>
                <p id="NFTprice">{e.price}</p>
            </div>
        </div>
        
        
    )
}

export default NFTitem;