import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { isAuth } from "../../utils/JwtUtils";
import { RootState } from "store/store";
import styled from './Mypage.module.scss';
import MypageAside from "./MypageAside";
import MypageContents from "./MypageContents";
import { axiosInstance } from "utils/customAxios";

import MypageImg from "assets/AnyConv.com__poster6.webp"

interface myPageProps {
    childern ?: React.ReactNode;
}

interface myPageDataType {
    name : string;
    roles : Array<string | null>;
    uesrBirth : Date | string;
    userEmail : string;
    userNickName : string;
}


const  Mypage : React.FC<myPageProps> = (props) => {
    const accessToken = useSelector((state:RootState) => state.auth.accessToken);
    const navigate = useNavigate();
   


    useEffect(() =>{
      /*  if(!isAuth(accessToken)){
            alert("로그인이 필요합니다.")
            navigate('/');
            return;
        }*/
    }, [accessToken]);

    return (
        <div className = {styled.myPageContainer}>
            <MypageAside className = {styled.leftAsideContainer}>
                <h4>내 정보 관리</h4>
                <ul>
                    <li><Link to = './userInfo' className = {styled.link}> 회원정보 수정 </Link> </li>
                    <li> 본인 인증 </li>
                </ul>
                <h4>공연 관리</h4>
                <ul>
                    <li><Link to ='./bookmark' className ={styled.link}>즐겨찾기 한 공연</Link></li>
                    <li>좋아요 한 아티스트</li>
                    <li>공연 일정 알림 신청</li>
                </ul>
                <h4> 커뮤니티</h4>
                <ul>
                    <li><Link to = './myWrite' className = {styled.link}> 내 작성글</Link></li>
                    <li> 나를 멘션한 댓글</li>
                </ul>
            </MypageAside>
            <Outlet/>
        </div>
    )
}

export default Mypage;

