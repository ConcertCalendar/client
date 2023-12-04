import UserProfile from 'components/User/UserProfile';
import styled from './CommentItem.module.scss';
import { changePostDateFormat } from 'utils/dateUtils';
import Report from 'components/Report/Report';
import CommentDelete from '../commentDelete/commentDelete';
import ReplyTest, { reply } from 'components/Reply/ReplyTest';
import CommentModify from '../CommentModify/CommentModify';
import { useState } from 'react';
import ReplyInputTest from '../Input/ReplyInputTest';
import { comment } from '../Comment';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUserId } from 'utils/JwtUtils';
import CommentInputTest from '../Input/CommentInputtest';
import CommentModifyInput from '../CommentModify/CommentModifyInput';

interface CommentItemProps {
    children ?: React.ReactNode;
    comment : comment;
    boardId : number;
}

const CommentItem:React.FC<CommentItemProps> = (props) => {
    const {comment , boardId} = props;
    const [clickModifyBtn , setClickModifyBtn] = useState<boolean>(false);
    const accessToken = useSelector((state:RootState)=>state.auth.accessToken);

    const [displayReplyInput , setDisplayReplyInput] = useState<boolean>(false); 

    const handleReplyInput = () => {
        setDisplayReplyInput(!displayReplyInput);
    }

    const renderReply = () => {
        return comment.replyDtoList.map((item)=>(
            <ReplyTest key = {item.id} commentId={item.commentId} createdDate={item.createdDate} id={item.id} modifiedDate={item.modifiedDate}
              replyContent={item.replyContent} replyWriterId={item.replyWriterId} replyWriterName={item.replyWriterName}/>
        ))
        
    }



    return (
        <li className = {styled.commentItemContainer}>
            <UserProfile nickName={comment.commentWriterName} className={styled.commentUserProfile}/>
            <Report className={styled.commentReport}/>
            <p className = {styled.commentDate}>{comment.modifiedDate ? changePostDateFormat(comment.modifiedDate) : changePostDateFormat(comment.createdDate)}</p>
            {clickModifyBtn ?
            <CommentModifyInput boardId={boardId} comment={comment} setModify = {setClickModifyBtn} clicked = {clickModifyBtn}/>
            : 
            <p className={styled.commentContent}>{comment.commentContent}</p>} 
            <div className = {styled.commentMenu}> 
                <p onClick={handleReplyInput}>답글</p>
                {getUserId(accessToken) === comment.commentWriterId &&<CommentDelete comment = {comment} boardId = {boardId}/>}
                {getUserId(accessToken) === comment.commentWriterId&&<CommentModify setModify = {setClickModifyBtn} clicked = {clickModifyBtn} comment = {comment} boardId = {boardId}/>}
            </div>
            {displayReplyInput&&<div className = {styled.replyInput}>
                <ReplyInputTest comment = {comment} to ={comment.commentWriterName}/>
            </div>}
            {renderReply()}
        </li>
    )

}

export default CommentItem;