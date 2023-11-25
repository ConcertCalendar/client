import MypageContents from "./MypageContents";
import styled from "./UserInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { isAuth } from "utils/JwtUtils";
import { axiosInstance } from "utils/customAxios";
import MypageImg from "assets/AnyConv.com__poster6.webp"
import Loading from "components/loading";

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
    const [loading , setLoading] = useState<boolean>(false);

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


    useEffect(() =>{
        async function getUserInfo () {
            await axiosInstance.get('/users/info').then((res)=>{
                changeUserNameHandler(res.data.data.name);
                changeUserBrithHandler(res.data.data.userBirth);
                changeUserEmailHandler(res.data.data.userEmail);
                changeUserNickNameHandler(res.data.data.userNickname);
                changeRolesHandler(res.data.data.roles);
                setLoading(true);
            })
        }
        getUserInfo();
    }, [loading]);

    return (
        <div className={styled.contentContainer}>
            <div className = {styled.title}>
                MY PAGE <span className = {styled.subtitle}>마이 페이지</span>
            </div>
            {
            loading ? 
            <div className = {styled.contentBox}>
                <img className = {styled.userImage} src = {MypageImg} alt = "회원 이미지" />
                <p className = {styled.userNickname}>@{userNickName}</p>
                <div className = {styled.info}>
                    유저 소개글
                </div>
            </div>             
            :
            <div className = {styled.contentBox}>
                <Loading className = {styled.loading}/>
            </div>
            }
        </div>     
    )
}

export default UserInfo;