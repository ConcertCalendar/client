import { useSelector } from 'react-redux';
import { axiosInstance } from '../../utils/customAxios';
import LikeImage from '../../components/Like/LikeImage';
import { getUserId, isAuth} from '../../utils/JwtUtils';
import styled from './Heart.module.scss';


function Heart ({boardId, postId ,heartSet , setHeartSet}) {
    const accessToken = useSelector((state)=> state.auth.accessToken);
 
    
    const handleHeartClick = () => {
        if(isAuth(accessToken)){ // 로그인이 되어있다면
            if(!heartSet.includes(getUserId(accessToken))){//좋아요를 누른적이 없으면
                axiosInstance.post(`boards/${boardId}/postsHeart/${postId}`)//좋아요 저장
                return
            }
            if(window.confirm("좋아요를 취소하시겠습니까?")){//좋아요를 누른적이 있으면
                axiosInstance.post(`boards/${boardId}/postsHeart/${postId}`) //좋아요 취소
                return
            }
            return
        }
        alert("로그인이 필요합니다") //로그인이 안 되어 있으면
    }

    return (
        <div className = {styled.heartContainer} onClick = {handleHeartClick} >
            <LikeImage className= {styled.postHeartImg} />
        </div>
    )
} 
export default Heart;