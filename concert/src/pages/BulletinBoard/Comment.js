
import { useState } from 'react';
import './Comment.css'
function Comment () {
    const [nickname,setNickname] = useState("user");
    const handleInputBtn = (event) => {
        event.preventDefault();
    }

    return (
    <div className="CommentContainer">
        <form className = "commentForm"> 
            <span className = "commentUser">{nickname}</span>
            <textArea
             className = "commentInput"
             placeholder='댓글을 입력하세요'
             maxlength = {300}
            />
            <button 
             className = "commentBtn"
             onClick = {handleInputBtn}>
                등록
             </button>
        </form>
    </div>) 
}
export default Comment;