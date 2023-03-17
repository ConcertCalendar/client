import { useEffect } from 'react';
import { useState } from 'react'
import { useLocation } from 'react-router';
import { axiosInstance } from '../../utils/customAxios';
import './Heart.css'
function Heart ({heartNum , changeHeart}) {
    const [clickedHeart ,  setClickedHeart] = useState(false);
    const location = useLocation();

    const handleHeartClick = () => {
        if(clickedHeart === false){
            changeHeart(heartNum+1)
        }else {
            changeHeart(heartNum-1)
        }
        axiosInstance.post(`${location.pathname}/heartClick`).then(res=> console.log(res)).catch((err)=>console.log(err))
        setClickedHeart(!clickedHeart);
    }


    return (
        <div className = "heartContainer" onClick = {handleHeartClick}>
            <img src = "/images/like.png"  alt = "" className = "postHeartImg"/>
            <div className = 'PostHaertNum'>{heartNum}</div>
        </div>
    )
} 
export default Heart;