import { useDispatch, useSelector } from "react-redux";
import styled  from '../Input/CommentInput.module.scss';
import { RootState } from "store/store";
import {useState} from 'react';
import { axiosInstance } from "utils/customAxios";
import MyProfile from "components/User/myProfile/MyProfile";
import { comment } from "../Comment";
import { modifyComment } from "store/commentSlice";

interface CommentModifyInputProps {
    children ?: React.ReactNode;
    boardId : number;
    comment : comment;
    setModify : React.Dispatch<React.SetStateAction<boolean>>;
    clicked : boolean;
}
const CommentModifyInput:React.FC<CommentModifyInputProps> = (props) => {
    const {boardId  , comment , setModify , clicked} = props;
    const accessToken = useSelector((state:RootState) => state.auth.accessToken);
    const [content, setContent] = useState<string>(comment.commentContent);
    const [currentLength , setCurrentLength] = useState<number>(comment.commentContent.length);
    const URL = `boards/${boardId}/posts/${comment.postId}/comments/${comment.id}`;
    const dispatch = useDispatch();


    const updateComment= () => {
        axiosInstance.put(URL, {"commentContent" : content})
        .then((res)=> {
            setModify(!clicked)
            dispatch(modifyComment({
                'id' : comment.id,
                'content' : content}))
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
        updateComment();
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

export default CommentModifyInput;