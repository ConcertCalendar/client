import MypageContents from "./MypageContents";
import styled from "./UserInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { isAuth } from "utils/JwtUtils";
import { axiosInstance } from "utils/customAxios";
import MypageImg from "assets/AnyConv.com__poster6.webp"

interface UserInfoProps{
    childern ?: React.ReactNode;
}

const UserInfo:React.FC<UserInfoProps>= (props) => {
    const {childern} = props;

    const accessToken = useSelector((state:RootState) => state.auth.accessToken);
    const navigate = useNavigate();
    const [userName , setUserName] = useState<string>("")
    const [roles , setRoles] = useState<Array<string>>([]);
    const [userBirth , setUserBirth] = useState<string|Date>("");
    const [userEmail , setUserEmail] = useState<string>("");
    const [userNickName , setUserNickName] = useState<string>("");
   
    const changeUserNameHandler = (name:string) => {
        setUserName(name);
    }

    const changeRolesHandler = (roles : Array<string>) => {
        setRoles(roles);
    }

    const changeUserBrithHandler = (birth:string | Date) => {
        setUserBirth(birth);
    } 

    const changeUserEmailHandler = (email:string) => {
        setUserEmail(email);
    }

    const changeUserNickNameHandler = (nickName:string) => {
        setUserNickName(nickName);
    }


    const clickMenu = () => {
        
    }

    useEffect(() =>{
        if(!isAuth(accessToken)){
            alert("로그인이 필요합니다.")
            navigate('/');
            return;
        }
        
        axiosInstance.get('/users/info')
        .then(
            (res)=> {
                console.log(res);
                if(res.status === 200){
                    changeUserNameHandler(res.data.data.name);
                    changeUserBrithHandler(res.data.data.userBirth);
                    changeUserEmailHandler(res.data.data.userEmail);
                    changeUserNickNameHandler(res.data.data.userNickname);
                    changeRolesHandler(res.data.data.roles);
                }
        })
        .catch((err)=> console.log(err))
        console.log(userNickName)
    }, []);

    return (
        <div>
            <MypageContents className={styled.contentContainer}>
                <div className = {styled.title}>
                    MY PAGE <span className = {styled.subtitle}>마이 페이지</span>
                </div>
                <div className = {styled.contentBox}>
                    <img className = {styled.userImage} src = {MypageImg} alt = "회원 이미지"/>
                    <p className = {styled.userNickname}>@{userNickName}</p>
                    <div className = {styled.info}>
                        유저 소개글
                    </div>
                </div>
            </MypageContents>     
        </div>
    )
}

export default UserInfo;