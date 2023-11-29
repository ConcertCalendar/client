import UserProfile from 'components/User/UserProfile';
import styled from './CommentItem.module.scss';
import { changePostDateFormat } from 'utils/dateUtils';
import Report from 'components/Report/Report';
import CommentDelete from '../commentDelete/commentDelete';
import ReplyTest, { replyDtoList } from 'components/Reply/ReplyTest';
import CommentModify from '../CommentModify/CommentModify';
import { useState } from 'react';
import ReplyInputTest from '../Input/ReplyInputTest';


interface CommentItemTest {
    childern ?: React.ReactNode;
    commentContent : string;
    commentWriterId : number;
    commentWriterName : string;
    createdDate : Date| string;
    id : number;
    modifiedDate : null | Date | string;
    postId : number;    
    boardId : number;
    reply : Array<replyDtoList>
}

const CommentItemTest:React.FC<CommentItemTest> = (props) => {
    const {commentContent, commentWriterId , commentWriterName , createdDate, id , modifiedDate, postId, boardId , reply} = props;
    const [displayReplyInput , setDisplayReplyInput ] = useState<boolean>(false); 
    
    const handleReplyInput = () => {
        setDisplayReplyInput(!displayReplyInput);

    }

    const renderReply = () => {
        return reply.map((item)=>(
            <ReplyTest key = {item.id} commentId={item.commentId} createdDate={item.createdDate} id={item.id} modifiedDate={item.modifiedDate}
              replyContent={item.replyContent} replyWriterId={item.replyWriterId} replyWriterName={item.replyWriterName}/>
        ))
        
    }

    return (
        <li className = {styled.commentItemContainer}>
            <UserProfile nickName={commentWriterName} className={styled.commentUserProfile}/>
            <Report className={styled.commentReport}/>
            <p className = {styled.commentDate}>{modifiedDate ? changePostDateFormat(modifiedDate) : changePostDateFormat(createdDate)}</p>
            <p className={styled.commentContent}>{commentContent}</p>
            <div className = {styled.commentMenu}> 
                <CommentDelete url = {`boards/${boardId}/posts/${postId}/comments/${id}` }/>    
                <CommentModify/>
                <p onClick={handleReplyInput}>답글</p>
            </div>
            {displayReplyInput&&<div className = {styled.replyInput}>
                <ReplyInputTest to ={commentWriterName}/>
            </div>}
            {renderReply()}
        </li>
    )

}

export default CommentItemTest;