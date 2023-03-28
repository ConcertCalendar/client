import { Link } from "react-router-dom";
import './PostModalHeader.css';

function PostModalHeader ({imgsrc , title , seeMore}) {
    return (
        <header className = "PostModalHeaderContainer">
            <img src = {imgsrc} alt = "" className = "postModalHeaderImg"/>
            <span className = "postModalHeaderTitle">{title}</span>
            <Link to = {seeMore} className = "postModalHeaderSeeMore">더보기 {">"}</Link>
        </header>
    )   
}

export default PostModalHeader;