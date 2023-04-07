import { Link } from 'react-router-dom';
import CommentImage from '../../../components/CommentImage/CommentImage';
import LikeImage from '../../../components/Like/LikeImage';
import styled from'./HotPostContent.module.scss'

function HotPostContent ({boardId , postTitle , like , comment , id}) {
    return (
        <Link to = {`boards/${boardId}/posts/${id}?page=0`} className = {styled.hotPostLink}>
            <div className = {styled.hotPostContentItemContainer}>
                <span className= {styled.hotPostContentBoardTag}>
                    {"내한 공연"}           
                </span>
                <span className= {styled.hotPostContentPostTitle}>
                    {postTitle}
                </span>
                <LikeImage number = {like} size = {"small"} className= {styled.likeImage} />
                <CommentImage number = {comment} size = {"small"} className= {styled.commentImage}/>
            </div>
        </Link>
    )


}

export default HotPostContent;