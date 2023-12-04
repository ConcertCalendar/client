import { useEffect, useState } from 'react';
import styled from './Myprofile.module.scss';
import userImg from 'assets/UserImage.jpg';
import { axiosInstance } from 'utils/customAxios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface UserMyProfileProps{
    childern ?: React.ReactNode;
    className : string;
}

const MyProfile:React.FC<UserMyProfileProps> = (props) => {
    const {className} = props;
    const token = useSelector((state:RootState)=> state.auth.accessToken);
    const [nickName , setNickName] = useState<string>("");

    useEffect(()=> {
        if(token){
            axiosInstance.get('users/info')
            .then((res)=> {
                console.log(res)
                setNickName(res.data.data.userNickname)
            })
            .catch(
                (err)=>console.log(err)
                )
        }
    }, [token])
    return (
        <section className = {`${className} ${styled.UserProfileWrap}`}>
            <img className= {styled.profileImg} src = {userImg} alt = "유저 프로필"/>
            <p className = {styled.nickname}> {nickName ? nickName : "User"}</p>
        </section>
    ) 
}

export default MyProfile;