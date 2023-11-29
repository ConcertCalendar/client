import UserProfile from 'components/User/UserProfile';
import styled from './Reply.module.scss';
import Report from 'components/Report/Report';
import { changePostDateFormat } from 'utils/dateUtils';

export interface replyDtoList {
    commentId : number;
    createdDate : Date|string;
    id : number;
    modifiedDate : null | Date  | string;
    replyContent : string;
    replyWriterId : number;
    replyWriterName : string;
}

const ReplyTest:React.FC<replyDtoList> = (props) => {
    const {commentId , createdDate , id, modifiedDate, replyContent, replyWriterId, replyWriterName} = props;
    return (
        <div className = {styled.replyContainer}>
            <UserProfile nickName={replyWriterName} className={styled.replyUserProfile}/>
            <Report className={styled.replyReport}/>
            <p className = {styled.replyDate}>{modifiedDate ? changePostDateFormat(modifiedDate) : changePostDateFormat(createdDate)}</p>
            <p className={styled.replyContent}>{replyContent}</p>
            <div className = {styled.replyMenu}> 
            
            </div>
        </div>
    )
}

export default ReplyTest;
