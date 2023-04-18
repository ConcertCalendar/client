import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import './CommentList.css';
import CommentInput from './Input/CommentInput';


function CommentList ({commentList , changeCommentList}) {
   
    const currentUid = useSelector((state) => state.login.currentUid);


    const renderCommentList = () => {
        return commentList.map((comment,idx) => (    
            <CommentItem key = {comment.id} comment = {comment} currentUid = {currentUid} commentList = {commentList} changeCommentList = {changeCommentList}/>
         ))
    }
            /*<div className = "commentBox" key = {comment.id}>
                <ul className = "comment">
                    <div className='commentProfile'>
                        <img className = "commentImg" src = "/images/poster6.jpeg" alt = ""/>
                        <p className = "commentName">{comment.commentWriterName}</p>
                    </div>
                    {comment.commentWriterId == currentUid  && <div className='commentDel'>삭제</div>}
                    <div className = "commentContent">{comment.commentContent}</div>
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
                             commentList = {commentList} changeCommentList = {changeCommentList}/>
                        </li>
                    ))}
                </ul>
            </div>*/
   

    useEffect( ()=> {
        console.log(commentList)
    } , [commentList]);

    return (
    <div className='commentContainer'>
        <CommentInput commentList = {commentList} changeCommentList = {changeCommentList}/>
        <div className='commentListContainer'>
            {renderCommentList()}
        </div>
    </div>
    ) 
}
export default CommentList;