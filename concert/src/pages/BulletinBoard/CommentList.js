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