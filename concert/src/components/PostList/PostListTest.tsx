import { changePostDateFormat } from "utils/dateUtils";
import styled from './PostListTest.module.scss';
interface PostListTestProps{
    childern ?: React.ReactNode;
    boardId : number;
    commentSize : number;
    createdDate : string | Date;
    id : number;
    modifiedDate : string|Date|null;
    postTitle : string;
    writerName : string;
    onClick : React.MouseEventHandler;
}

const PostListTest:React.FC<PostListTestProps> = (props) => {
    const {id , createdDate , modifiedDate, postTitle, writerName , commentSize , onClick } = props;
    return (
        <div className = {styled.th} onClick={onClick}>
            <span className = {styled.trId}>{id}</span>
            <span className = {styled.trPostTitle} data-comment = {commentSize}>{postTitle}</span>
            <span className = {styled.trWriterName}>{writerName}</span>
            <span className = {styled.trCreatedDate}>{changePostDateFormat(createdDate)}</span>
        </div>
    )
}

export default PostListTest;