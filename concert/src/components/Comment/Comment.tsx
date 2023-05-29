import {useState} from 'react';
import CommentInputTest from "./Input/CommentInputtest";
import styled from './Comment.module.scss';
import CommentItem from "./CommentItem";
import { getUserId } from "utils/JwtUtils";
import CommentItemTest from './commentItem/CommentItemTest';
import { replyDtoList } from 'components/Reply/ReplyTest';
interface CommentProps {
    token : string;
    commentList : Array<CommentDtoList>;
    boardId : number;
    postId : number;
}

export interface CommentDtoList {
    commentContent : string;
    commentWriterId : number;
    commentWriterName : string;
    createdDate : Date| string;
    id : number;
    modifiedDate : null | Date | string;
    postId : number;    
    replyDtoList : Array<replyDtoList>;
}


const Comment:React.FC<CommentProps> = (props) => {
    const {token , commentList , boardId , postId} = props;
    const [currentUid , setCurrentUid] = useState<number>(0);

    const renderCommentList = () => {
        return commentList.map((comment) => (    
            <CommentItemTest key={comment.id} boardId = {boardId} commentContent={comment.commentContent} commentWriterId={comment.commentWriterId} 
            commentWriterName={comment.commentWriterName} createdDate={comment.createdDate} id={comment.id} modifiedDate={comment.modifiedDate} 
            postId={comment.postId} reply = {comment.replyDtoList}/>
         ))
    }


    
    return (
        <section className={styled.commentContainer}>
            <header className = {styled.title}>댓글</header>
            <CommentInputTest url = {`boards/${boardId}/posts/${postId}/comments`} token = {token}/>
            <ul>
                {renderCommentList()}
            </ul>
        </section>
    )

}

export default Comment;