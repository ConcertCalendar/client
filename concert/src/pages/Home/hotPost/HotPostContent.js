import { Link } from 'react-router-dom';
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
                <img className= 'hotPostContentLikeImg' src = 'images/like.png' alt = ""/>
                <span className = "hotPostContentlike">
                    {like}
                </span>
                <img className= 'hotPostContentReplyImg' src = 'images/reply.png' alt = ""/>
                <span className = "hotPostContentreply">
                    {reply}
                </span>
            </div>
        </Link>
    )


}

export default HotPostContent;