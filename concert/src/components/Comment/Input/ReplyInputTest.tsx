import { useState } from 'react';
import styled from './ReplyInput.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import MyProfile from 'components/User/myProfile/MyProfile';
import { comment } from '../Comment';
import { axiosInstance } from 'utils/customAxios';


/*
commentId : number;
createdDate : Date|string;
id : number;
modifiedDate : null | Date  | string;
replyContent : string;
replyWriterId : number;
replyWriterName : string;
*/
interface ReplyInput {
    Childern ?: React.ReactNode;
    comment : comment;
    to : string;
}

const ReplyInputTest:React.FC<ReplyInput> = (props) => {
    const {comment,to} = props;
    const token = useSelector((state:RootState)=>state.auth.accessToken);
    const [content, setContent] = useState<string>();
    const [currentLength , setCurrentLength] = useState<number>(0);
    const URL = `/comments/${comment.id}/replies`
    
    const postComment= () => {
        axiosInstance.post(URL, {"replyContent" : content})
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
        <div className = {styled.replyInpuContainer}>
            <MyProfile  className={styled.replyUserProfile}/>
            <textarea
                className = {styled.replyInput}
                placeholder={token ? '답글을 입력하세요' : '답글을 작성하려면 로그인을 해주세요'}
                maxLength = {300}
                onChange = {handleLength}
                value = {content}
                disabled = {!Boolean(token)}
                />
            <div className = {styled.inputFooter}>
                    <button 
                    className = {styled.replyBtn}
                    onClick = {handleInputBtn}>
                        등록
                    </button>
                    <p className = {styled.currentLength}>{currentLength}/300</p>
            </div>
        </div>
    )
}

export default ReplyInputTest;