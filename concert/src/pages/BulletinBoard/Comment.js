import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Comment.css';
import CommentInput from './Input/CommentInput';
import ReplyInput from './Input/ReplyInput';
import Reply from './Reply.js';

function Comment ({commentList , changeCommentList}) {
    const token = useSelector((state)=> state.auth.accessToken);
    const [display , setDisplay] = useState(false);
    const [displayId , setDisplayId] = useState(null);
    const handleToReply = (id) => {
        setDisplayId(id);
        setDisplay(!display);
    }

    const handleToModify = () => {
        console.log("clicked")
    }


    const renderCommentList = () => {
        return commentList.map((comment,idx) => (
            <div className = "commentBox" key = {comment.id}>
                <ul className = "comment">
                    <div className='commentProfile'>
                        <img className = "commentImg" src = "/images/poster6.jpeg" alt = ""/>
                        <p className = "commentName">{comment.commentWriterName}</p>
                    </div>
                    <p className = "commentContent">{comment.commentContent}</p>
                    <div className = "commentBottom">
                        <p className = "commentCreatedDate">{comment.createdDate}</p>
                        <p className = "replyBtn"  onClick={handleToReply.bind(this,comment.id)}>댓글</p> 
                        <p className = "modifyBtn" onClick={handleToModify.bind(this, comment.commentContent)}>수정</p>
                    </div>
                    {display && (displayId === comment.id) && 
                    <ReplyInput toReply = {comment.commentWriterName} commentId = {comment.id} commentList = {commentList}changeCommentList = {changeCommentList}/>}
                    {comment.replyDtoList.length !== 0 && comment.replyDtoList.map((reply)=> (
                        <li key = {reply.id}>
                            <Reply 
                             commentId = {reply.commentId} createdDate = {reply.createdDate} id = {reply.id}
                             modifiedDate = {reply.modifiedDate} replyContent= {reply.replyContent}  replyWriterId = {reply.replyWriterId}
                             replyWriterName = {reply.replyWriterName} 
                             commentList = {commentList}changeCommentList = {changeCommentList}/>
                        </li>
                    ))}
                </ul>
            </div>
        ))
    }

    useEffect( ()=> {
        
    } , [commentList]);

    return (
    <div className='commentContainer'>
        <CommentInput commentList = {commentList}changeCommentList = {changeCommentList}/>
        <div className='commentListContainer'>
            {renderCommentList()}
        </div>
    </div>
    ) 
}
export default Comment;