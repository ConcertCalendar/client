
import styled  from './CommentInput.module.scss';
import { useState } from 'react';

import MyProfile from 'components/User/myProfile/MyProfile';
import { axiosInstance } from 'utils/customAxios';
interface CommentInputProps {
    token : string;
    url : string;
}

const CommentInputTest:React.FC<CommentInputProps> = (props) => {
    const { token  , url } = props;
    const [content, setContent] = useState<string>("");
    const [currentLength , setCurrentLength] = useState<number>(0);

    const postComment= () => {
        axiosInstance.post(url, {"commentContent" : content})
        .then((res)=> console.log(res))
        .catch((err)=>console.log(err));
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
            <MyProfile token={token} className={styled.commentUserProfile}/>
            <textarea
                className = {styled.commentInput}
                placeholder={token ? '댓글을 입력하세요' : '댓글을 작성하려면 로그인을 해주세요'}
                maxLength = {300}
                onChange = {handleLength}
                value = {content}
                disabled = {!Boolean(token)}
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