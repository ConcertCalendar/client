import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Post() {
    const [boardId, setBoardId] = useState();  // board 고유 번호
    const [createdDate,setCreatedDate] = useState(); // 포스트 생성 날짜
    const [modifiedDate,setModifiedDate] = useState(null); //포스트 수정 날짜
    const [id,setId] = useState();
    const [postContent,setPostContent] = useState();
    const [postTitle, setPostTitle] = useState();
    const [writerId,setWriterId] = useState();
    const [writerName , setWriterName] = useState();
    const [heart , setHeart] = useState(0);
    const location = useLocation();

    useEffect(()=> {
        async function getPost(){
            const response = await axios.get(`http://3.37.69.149:8080${location.pathname}`)
            if(response.status === 200){
                setBoardId(response.data.data.boardId);
                setCreatedDate(response.data.data.createdDate);
                setModifiedDate(response.data.data.modifiedDate);
                setId(response.data.data.id);
                setPostContent(response.data.data.postContent);
                setPostTitle(response.data.data.postTitle);     
                setHeart(response.data.data.heart);     
                setWriterId(response.data.data.writerId);
                setWriterName(response.data.data.writerName);
            }
        }
        getPost();
    } , [location])

    return (
        <div className = "postContainer">
            <div className = "postTitle">
                {postTitle}
            </div>
            <div className = "postContent">
                {postContent}
            </div>
        </div>
    )
}

export default Post;