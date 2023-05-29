import { useState } from "react";
import {axiosInstance} from "../../utils/customAxios"
import { useLocation } from "react-router";
import './CommentItem.css'
import ReplyInput from "./Input/ReplyInput";
import CommentModify from "./CommentModify";
import { changePostDateFormat } from "utils/dateUtils";
import Reply from "pages/BulletinBoard/Reply";

function CommentItem ({comment , currentUid, commentList , changeCommentList}) {
    const [replyInputDisplay , setReplyInputDisplay] = useState(false); //리플라이 창 보이기
    const [commentModifyDisplay , setCommentModifyDisplay] = useState(false);
    const [displayId , setDisplayId] = useState(null);

    const location = useLocation();
    const handleToReply = (id) => {
        setDisplayId(id);
        if(commentModifyDisplay === true){
            setCommentModifyDisplay(!commentModifyDisplay);
        }
        setReplyInputDisplay(!replyInputDisplay);
    }

    const handleToModify = (content, id) => {
        setDisplayId(id);
        if(replyInputDisplay === true){
            setReplyInputDisplay(!replyInputDisplay);
        }
        setCommentModifyDisplay(!commentModifyDisplay);
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
                <img className = "commentImg" src = "/images/AnyConv.com__poster6.WEBP" alt = ""/>
                <p className = "commentName">{comment.commentWriterName}</p>
                {comment.commentWriterId === currentUid  && <div className='commentDel' onClick={handleToDel}>삭제</div>}
            </div>
            <div className = "commentContent">{comment.commentContent}</div>
            <div className = "commentBottom">
                <p className = "commentCreatedDate">{changePostDateFormat(comment.createdDate)}</p>
                <p className = "replyBtn"  onClick={handleToReply.bind(this,comment.id)}>댓글</p> 
                {comment.commentWriterId === currentUid  && <p className = "modifyBtn" onClick={handleToModify.bind(this, comment.commentContent , comment.id)}>수정</p>}
            </div>
            {replyInputDisplay && (displayId === comment.id) && 
            <ReplyInput  toReply = {comment.commentWriterName} commentId = {comment.id} commentList = {commentList} 
             changeCommentList = {changeCommentList} />}
             {commentModifyDisplay && (displayId === comment.id) && 
            <CommentModify modifyDisplay = {commentModifyDisplay}  setModifyDisplay = {setCommentModifyDisplay}  prevContent = {comment.commentContent}
             commentId = {comment.id} commentList = {commentList} changeCommentList = {changeCommentList} url = {`${location.pathname}/comments/${comment.id}`}
             body = {'commentContent'}/>}
            {comment.replyDtoList.length !== 0 && comment.replyDtoList.map((reply)=> (
                <li key = {reply.id}>
                    <Reply
                     commentId = {reply.commentId} createdDate = {reply.createdDate} currentUid = {currentUid} id = {reply.id}
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