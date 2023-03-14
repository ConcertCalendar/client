import './HotPost.css'
import PostModalHeader from '../PostModalHeader.js';

function HotPost() {
    return (
        <article className = "hotPostContainer">
            <PostModalHeader imgsrc = {"images/fire.png"} title = {"HOT 게시판"} seeMore = {"/boards/1?page=0"}/>
            <div className = "hotPostContent"></div>
        </article>
    )
}

export default HotPost;