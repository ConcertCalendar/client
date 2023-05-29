import styled from './UserProfile.module.scss';
import userImg from '../../assets/UserImage.jpg';

interface UserProfileProps{
    childern ?: React.ReactNode;
    nickName : string;
    className : string;
}

const UserProfile:React.FC<UserProfileProps> = (props) => {
    const {nickName , className} = props;
    return (
        <div className = {`${className} ${styled.UserProfileWrap}`}>
            <img className= {styled.profileImg} src = {userImg} alt = "유저 프로필"/>
            <p className = {styled.nickname}> {nickName}</p>
        </div>
    ) 
}

export default UserProfile;
