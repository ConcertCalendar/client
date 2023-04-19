import { changePostDateFormat } from "utils/dateUtils";
import styled from './userPostItem.module.scss'
import { changeBoardId } from "utils/boardId";
import LikeImage from "components/Like/LikeImage";
import CommentImage from "components/CommentImage/CommentImage";
interface userPostItemProps {
    childern ?: React.ReactNode;
    boardId : number ;
    commentDtoList : Array<string>;
    createdDate : string | Date;
    id : number;
    modifiedDate : null | string | Date;
    postContent : string;
    postHeartState : boolean; 
    postHeartSize : number;
    postTitle : string;  
    writerId : number;
    writerName : string; 
}

const UserPostItem:React.FC<userPostItemProps> = (props) => {
    const {boardId , commentDtoList , createdDate, id , modifiedDate , postContent, postHeartSize ,postHeartState, postTitle, writerId , writerName} = props;
    

    return (
        <div className = {styled.postContainer}>
            <div className= {styled.postHead}>
                <div className = {styled.boardId}>{changeBoardId(boardId)} </div>
                <div className = {styled.postTitle}>{postTitle}</div>
                <div className = {styled.createdDate}>{changePostDateFormat(createdDate)}</div>
            </div>
            <div className = {styled.postBody}>
                <div className = {styled.postContent}>{postContent}</div>
                <div className = {styled.postBottom}>
                    <LikeImage className = {styled.like} number = {commentDtoList.length} size = 'small' fill = {postHeartState} />
                    <CommentImage className = {styled.comment}number = {postHeartSize} size = "small"/>
                </div>
            </div>
        </div>
    )


}  

export default UserPostItem;