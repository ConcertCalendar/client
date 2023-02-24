
import { useEffect, useState } from 'react';
import './Comment.css'
function Comment ({commentList}) {
    const [nickname,setNickname] = useState("user");
    const [currentLength , setCurrentLength] = useState(0);
    const handleInputBtn = (event) => {
        event.preventDefault();
    }
    
    const handleLength = (event) => {
        setCurrentLength(event.target.value.length);
    }


    const renderCommentList = () => {
        return commentList.map((comment) => (
            <div className = "commentBox" key = {comment.id}>
                <div className='commentProfile'>
                    <img className = "commentImg" src = "/images/poster6.jpeg" alt = ""/>
                    <p className = "commentName">{comment.commentWriterName}</p>
                </div>
                <p className = "commentContent">{comment.commentContent}</p> 
                <p className = "commentCreatedDate">{comment.createdDate}</p>
            </div>
        ))
    }
    useEffect( ()=> {
    
    } , []);

    return (
    <div className='commentContainer'>
        <div className="CommentInputContainer">
            <p className = "commentTitle"> 댓글 </p>
            <form className = "commentForm"> 
                <span className = "commentUser">{nickname}</span>
                <textarea
                className = "commentInput"
                placeholder='댓글을 입력하세요'
                maxLength = {299}
                onChange = {handleLength}
                />
                <div className = "inputFooter">
                    <button 
                    className = "commentBtn"
                    onClick = {handleInputBtn}>
                        등록
                    </button>
                    <p className = "currentLength">{currentLength}/300</p>
                </div>
                
            </form>
        </div>
        <div className='commentListContainer'>
            {renderCommentList()}
        </div>
    </div>
    ) 
}
export default Comment;