import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import NFTitem from './NFTitem';
import dummyNFT from "../resources/dummyNFT"
import "./NFTscroll.css"
export default function NFTscroll() {
    
    return(
        <div className='thiscontainer'>
        <div className='NFTcontainer'>
            {dummyNFT.map((e)=>{
                return(
                    <NFTitem imgUrl={e.imgUrl} collection={e.collection} name={e.name} price={e.price} />
                )
            })}
        </div>
        </div>
    )
}