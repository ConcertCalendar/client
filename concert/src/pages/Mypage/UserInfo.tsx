import styled from "./UserInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { axiosInstance } from "utils/customAxios";
import Loading from "components/loading";

interface UserInfoProps{
    childern ?: React.ReactNode;
}

const UserInfo:React.FC<UserInfoProps>= (props) => {
    const {childern} = props;

    const accessToken = useSelector((state:RootState) => state.auth.accessToken);
    const navigate = useNavigate();
    const [userNickName , setUserNickName] = useState<string>("");
    const [userImage , setUserImage] = useState<string>("");
    const [loading , setLoading] = useState<boolean>(false);





    useEffect(() =>{
        async function getUserInfo () {
            await axiosInstance.get('/users/info').then((res)=>{
                setLoading(true);
                setUserNickName(res.data.data.name)
                setUserImage(res.data.data.userProfileImgUrl)
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
                <img className = {styled.userImage} src = {userImage} alt = "회원 이미지" />
                <p className = {styled.userNickname}>@{userNickName}</p>
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