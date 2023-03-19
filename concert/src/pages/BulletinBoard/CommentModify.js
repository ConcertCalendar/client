import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../utils/customAxios';
import './CommentModify.css'

function CommentModify ({prevContent,  commentId,commentList , changeCommentList}) {
    const location = useLocation();
    const [nickname, setNickname] = useState("user");
    const [currentLength , setCurrentLength] = useState(0);
    const [content, setContent] = useState(prevContent);

    const modifyComment = async () => {
       axiosInstance.put(`${location.pathname}/comments/${commentId}`, {'commentContent' : content})
       .then((res)=> {
            if(res.status === 200){
                axiosInstance.get(`${location.pathname}`)
                .then((response)=> {
                    if(response.status === 200){
                        changeCommentList(response.data.data.commentDtoList); 
                    }
                })
                .catch((err)=>console.log(err))
            }
        }).catch((err)=> console.log(err))
    }

    const handleReplyInputBtn = (event) => {
        event.preventDefault();
        if(content === ""){
            alert("댓글을 입력해주세요.") 
            return;
        }  
        modifyComment();
    }
    
    const handleLength = (event) => {
        setContent(event.target.value);
        setCurrentLength(event.target.value.length);
    }
   

    return(
        <div className="commentModifyContainer">
            <form className = "commentModifyForm"> 
                <span className = "commentModifyUser">{nickname}</span>
                <textarea
                className = "commentModifyInput"
                placeholder='댓글을 입력하세요'
                maxLength = {299}
                onChange = {handleLength}
                value = {content}
                />
                <div className = "inputFooter">
                    <button 
                    className = "commentModifyPostBtn"
                    onClick = {handleReplyInputBtn}>
                        등록
                    </button>
                    <p className = "currentLength">{currentLength}/300</p>
                </div>
            </form>
        </div>
    )

}

export default CommentModify;