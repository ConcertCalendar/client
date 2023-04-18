import { useSelector } from 'react-redux';
import { axiosInstance } from '../../utils/customAxios';
import LikeImage from '../../components/Like/LikeImage';
import { isAuth} from '../../utils/JwtUtils';
import styled from './Heart.module.scss';
import { RootState } from 'store/store';
import { useEffect , useState } from 'react';

interface heartProps {
    boardId : number;
    postId : number;
    heartSet : Array<string>;

}
const  Heart : React.FC<heartProps> = (props) => {
    const {boardId, postId ,heartSet } = props;
    const accessToken = useSelector((state:RootState)=> state.auth.accessToken);
    const currentUserEmail = useSelector((state:RootState)=>state.login.currentUserEmail);
    const [heartState , setHeartState] = useState<boolean>(false);

    const checkHeart = (item : Array<string> , userEmail : string) => {
        const checkArr = item.filter((el)=> el === userEmail)
        if(checkArr.length){ //빈 배열이 아니면
            return true;
        }
        return false;
    }

    
    const handleHeartClick = () => {
        if(isAuth(accessToken)){ // 로그인이 되어있다면
            if(!heartState){//좋아요를 누른적이 없으면
                axiosInstance.post(`boards/${boardId}/postsHeart/${postId}`)
                .then((res)=>{
                    if(res.status === 200)
                        setHeartState(true);//좋아요 저장
                    
                }).catch((err)=> alert("좋아요에 실패했습니다. 다시 시도해주세요."));
                return
            }
            if(window.confirm("좋아요를 취소하시겠습니까?")){//좋아요를 누른적이 있으면
                axiosInstance.post(`boards/${boardId}/postsHeart/${postId}`) //좋아요 취소
                .then((res)=> {
                    if(res.status === 200)
                        setHeartState(false);
                }).catch((err)=> alert("좋아요 취소에 실패했습니다. 다시 시도해주세요."))
                return
            }
            return
        }
        alert("로그인이 필요합니다") //로그인이 안 되어 있으면
    }

    useEffect(()=> {
        setHeartState(checkHeart(heartSet, currentUserEmail));
    }, [props])

    return (
        <div className = {styled.heartContainer} onClick = {handleHeartClick}  >
            <LikeImage fill = {heartState} className= {styled.postHeartImg} />
        </div>
    )
} 
export default Heart;