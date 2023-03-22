import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { axiosInstance } from '../../utils/customAxios';
import CommentModify from './CommentModify';
import ReplyInput from './Input/ReplyInput';
import './Reply.css'

function Reply({commentId , createdDate , id ,modifiedDate , replyContent , replyWriterId , replyWriterName , commentList ,changeCommentList}) {
    const [display , setDisplay] = useState(false);
    const [displayId , setDisplayId] = useState(null);
    const [replyModifyDisplay , setReplyModifyDisplay]  = useState(false);
    const currentUid = useSelector((state)=> state.login.currentUid);
    const location = useLocation();
    
    const handleToReply = (id) => {
        setDisplayId(id);
        if(replyModifyDisplay === true){
            setReplyModifyDisplay(!replyModifyDisplay);
        }
        setDisplay(!display);
    }

    const handleToModify = (content, id) => {
        setDisplayId(id);
        if(display === true){
            setDisplay(!display);
        }
        setReplyModifyDisplay(!replyModifyDisplay);
    }


    const handleToDel = () => {
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            axiosInstance.delete(`comments/${commentId}/replies/${id}`).then((res)=> {
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
                        <p className = "modifyBtn" onClick={handleToModify.bind(this,replyContent, commentId)}>수정</p>
                    </div>
                </div>
            </div>
            {display && (displayId === commentId) && 
            <ReplyInput toReply = {replyWriterName} commentId = {commentId} commentList = {commentList} changeCommentList = {changeCommentList}/>}
            {replyModifyDisplay && (displayId === commentId) && 
            <CommentModify modifyDisplay  = {replyModifyDisplay}  setModifyDisplay = {setReplyModifyDisplay} prevContent = {replyContent} 
             commentId = {commentId} commentList = {commentList} changeCommentList = {changeCommentList} url = {`/comments/${commentId}/replies/${id}`}
             body = {'replyContent'}/>}
        </>
    )

} 

export default Reply;




