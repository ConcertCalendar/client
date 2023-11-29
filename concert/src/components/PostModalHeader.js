import './PostModalHeader.css';

function PostModalHeader ({imgsrc , title }) {
    return (
        <header className = "PostModalHeaderContainer">
            <img src = {imgsrc} alt = "" className = "postModalHeaderImg"/>
            <span className = "postModalHeaderTitle">{title}</span>
        </header>
    )   
}

export default PostModalHeader;