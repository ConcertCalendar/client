import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReplyInput from './Input/ReplyInput';
import './Reply.css'

function Reply({commentId , createdDate , id ,modifiedDate ,replyContent , replyWriterId , replyWriterName , commentList ,changeCommentList}) {
    const [display , setDisplay] = useState(false);
    const [displayId , setDisplayId] = useState(null);
    const currentUid = useSelector((state)=> state.login.currentUid);
    const handleToReply = (id) => {
        setDisplayId(id);
        setDisplay(!display);
    }

    const handleToModify = () => {
        console.log('clicked')
    }

    const handleToDel = () => {
        console.log('del')
    }

    return (
        <>
            <div className = "replyContainer">
                <div className = "replyBox">
                    <div className='replyProfile'>
                        <img className = "replyProfileImg" src = "/images/poster6.jpeg" alt = ""/>
                        <p className = "replyName">{replyWriterName}</p>
                        {replyWriterId === currentUid  && <div className='replyDel' onClick={handleToDel}>삭제</div>}
                    </div>
                    <p className = "replyContent">{replyContent}</p> 
                    <div className = "replyBottom">
                        <p className = "replyCreatedDate">{createdDate}</p>
                        <p className = "replyBtn"  onClick={handleToReply.bind(this,commentId)}>댓글</p> 
                        <p className = "modifyBtn" onClick={handleToModify.bind(this, replyContent)}>수정</p>
                    </div>
                </div>
            </div>
            {display && (displayId === commentId) && 
            <ReplyInput toReply = {replyWriterName} commentId = {commentId} commentList = {commentList} changeCommentList = {changeCommentList}/>}
        </>
    )

} 

export default Reply;




