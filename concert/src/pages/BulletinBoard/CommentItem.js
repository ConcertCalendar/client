import { useState } from "react";
import {axiosInstance} from "../../utils/customAxios"
import { useLocation } from "react-router";
import './CommentItem.css'
import ReplyInput from "./Input/ReplyInput";
import Reply from "./Reply";

function CommentItem ({comment , currentUid, commentList , changeCommentList}) {
    const [display , setDisplay] = useState(false); //리플라이 창 보이기
    const [displayId , setDisplayId] = useState(null);
    const location = useLocation();
    const handleToReply = (id) => {
        setDisplayId(id);
        setDisplay(!display);
    }

    const handleToModify = () => {
        console.log("clicked")
    }

    const handleToDel = () => {
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            axiosInstance.delete(`${location.pathname}/comments/${comment.id}`).then((res)=> {
                if(res.status === 200){
                    axiosInstance.get(`${location.pathname}`)
                    .then((res)=> {
                        if(res.status === 200) 
                            changeCommentList(res.data.data.commentDtoList)
                    })
                    .catch((err)=>console.log(err))
                }   
            })
        }
    }

    return (
        <div className = "commentBox" key = {comment.id}>
            <ul className = "comment">
            <div className='commentProfile'>
                <img className = "commentImg" src = "/images/poster6.jpeg" alt = ""/>
                <p className = "commentName">{comment.commentWriterName}</p>
                {comment.commentWriterId === currentUid  && <div className='commentDel' onClick={handleToDel}>삭제</div>}
            </div>
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
        </div>
    )
}
export default CommentItem;