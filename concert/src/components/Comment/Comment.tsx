import {useState} from 'react';
import CommentInputTest from "./Input/CommentInputtest";
import styled from './Comment.module.scss';
import { getUserId } from "utils/JwtUtils";
import CommentItem from './commentItem/CommentItemTest';
import { reply } from 'components/Reply/ReplyTest';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';


export type comment = {
    commentContent : string;
    commentWriterId : number;
    commentWriterName : string;
    createdDate : Date| string;
    id : number;
    modifiedDate : null | Date | string;
    postId : number;    
    replyDtoList : Array<reply>
}

interface CommentProps {
    children ?: React.ReactNode;
    boardId : number;
    postId : number;
}

const Comments:React.FC<CommentProps> = (props) => {
    const {boardId , postId} = props 
    const [currentUid , setCurrentUid] = useState<number>(0);
    const commentList = useSelector((state:RootState)=>state.comment.commentList);
    const renderCommentList = () => {
        return commentList.map((comment) => (    
            <CommentItem key = {comment.id} boardId = {boardId } comment={comment}/>
         ))
    }

    return (
        <section className={styled.commentContainer}>
            <header className = {styled.title}>댓글</header>
            <CommentInputTest  postId = {postId} boardId={boardId}/>
            <ul>
                {renderCommentList()}
            </ul>
        </section>
    )

}

export default Comments;