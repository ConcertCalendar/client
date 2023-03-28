import { Link } from 'react-router-dom';
import LikeImage from '../../../components/Like/LikeImage';
import './HotPostContent.css'

function HotPostContent ({boardId , postTitle , like , reply , id}) {
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
            
                <img className= 'hotPostContentReplyImg' src = 'images/reply.png' alt = ""/>
                <span className = "hotPostContentreply">
                    {reply}
                </span>
            </div>
        </Link>
    )


}

export default HotPostContent;