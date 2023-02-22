import './Post.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Comment from './Comment';

function Post() {
    const [boardId, setBoardId] = useState();  // board 고유 번호
    const [createdDate,setCreatedDate] = useState(); // 포스트 생성 날짜
    const [modifiedDate,setModifiedDate] = useState(null); //포스트 수정 날짜
    const [id,setId] = useState(); //게시글 고유 번호
    const [postContent,setPostContent] = useState(); //포스트 내용
    const [postTitle, setPostTitle] = useState(); //포스트 제목
    const [writerId,setWriterId] = useState(); //글쓴이 고유 아이디
    const [writerName , setWriterName] = useState(); //글쓴이 이름
    const [heart , setHeart] = useState(0); //좋아요
    const location = useLocation();
    const postScroll = useRef();
    const boardArr = useSelector((state)=>state.board.boardArr);

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
        <div className = "postContainer" ref={postScroll}>
            <div className = "postHead"> 
                <div className = "category">
                    {boardArr[boardId - 1]}
                </div>
                <div className = "postTitle">
                    {postTitle}
                </div>
                <div className = "writerName">
                    {writerName}
                </div>
                <div className = "createdDate">
                    {createdDate}
                </div>
                <div className = "heart">
                    {heart}
                </div>
            </div>
            <div className = "postContent">
                {postContent}
            </div>
            <Comment/>
        </div>
    )
}

export default Post;