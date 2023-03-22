
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { axiosInstance } from '../../utils/customAxios';
import {isAuth} from '../../utils/JwtUtils';
import './Heart.css'

function Heart ({heartNum , changeHeart}) {
    const accessToken = useSelector((state)=> state.auth.accessToken);

    const [clickedHeart ,  setClickedHeart] = useState(false);
    const location = useLocation();

    const handleHeartClick = () => {
        if(isAuth(accessToken)){
            if(clickedHeart === false){
                changeHeart(heartNum+1)
            }else {
                changeHeart(heartNum-1)
            }
            axiosInstance.post(`${location.pathname}/heartClick`).then(res=> console.log(res)).catch((err)=>console.log(err))
            setClickedHeart(!clickedHeart);
        }
    }


    return (
        <div className = "heartContainer" onClick = {handleHeartClick}>
            <img src = "/images/like.png"  alt = "" className = "postHeartImg"/>
            <div className = 'PostHaertNum'>{heartNum}</div>
        </div>
    )
} 
export default Heart;