import { Link } from 'react-router-dom';
import CommentImage from '../../../components/CommentImage/CommentImage';
import LikeImage from '../../../components/Like/LikeImage';
import './HotPostContent.css'

function HotPostContent ({boardId , postTitle , like , comment , id}) {
    return (
        <Link to = {`boards/${boardId}/posts/${id}?page=0`} className = "hotPostLink">
            <div className = "hotPostContentItemContainer">
                <span className= "hotPostContentBoardTag">
                    {"내한 공연"}           
                </span>
                <span className= "hotPostContentPostTitle">
                    {postTitle}
                </span>
                <LikeImage number = {like} />
                <CommentImage number = {comment}/>
            </div>
        </Link>
    )


}

export default HotPostContent;