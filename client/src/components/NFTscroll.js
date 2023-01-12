import React, {useContext} from 'react';
import NFTitem from './NFTitem';
import dummyNFT from "../resources/dummyNFT"
import { UserContext } from '../UserContext';
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