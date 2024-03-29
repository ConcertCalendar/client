
import styled  from './CommentInput.module.scss';
import { useState } from 'react';

import MyProfile from 'components/User/myProfile/MyProfile';
import { axiosInstance } from 'utils/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setCommentList } from 'store/commentSlice';

interface CommentInputProps {
    children ?: React.ReactNode;
    boardId : number;
    postId : number;
}

const CommentInputTest:React.FC<CommentInputProps> = (props) => {
    const {boardId , postId} = props;
    const accessToken = useSelector((state:RootState) => state.auth.accessToken);
    const [content, setContent] = useState<string>("");
    const [currentLength , setCurrentLength] = useState<number>(0);
    const URL = `boards/${boardId}/posts/${postId}/comments`;
    const dispatch = useDispatch();


    const postComment= () => {
        axiosInstance.post(URL, {"commentContent" : content})
        .then((res)=> {
            console.log(res); /* 리랜더링필요 */
        })
        .catch((err)=> alert("댓글 입력에 실패했습니다. 다시 시도해주세요."));
    }

    const handleLength = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        setCurrentLength(event.target.value.length);
    }

    const handleInputBtn = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(content === ""){
            alert("댓글을 입력해주세요.") 
            return;
        }  
        postComment();
    }
    
    return (
        <section className = {styled.commentInpuContainer}>
            <MyProfile className={styled.commentUserProfile}/>
            <textarea
                className = {styled.commentInput}
                placeholder={accessToken ? '댓글을 입력하세요' : '댓글을 작성하려면 로그인을 해주세요'}
                maxLength = {300}
                onChange = {handleLength}
                value = {content}
                disabled = {!Boolean(accessToken)}
                />
            <div className = {styled.inputFooter}>
                    <button 
                    className = {styled.commentBtn}
                    onClick = {handleInputBtn}>
                        등록
                    </button>
                    <p className = {styled.currentLength}>{currentLength}/300</p>
            </div>
        </section>
    )
} 

export default CommentInputTest;