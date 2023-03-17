import './Post.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Comment from './Comment';
import Heart from './Heart';

function Post( {loading}) {
    const [boardId, setBoardId] = useState();  // board 고유 번호
    const [createdDate,setCreatedDate] = useState(); // 포스트 생성 날짜
    const [modifiedDate,setModifiedDate] = useState(null); //포스트 수정 날짜
    const [id,setId] = useState(); //게시글 고유 번호
    const [postContent,setPostContent] = useState(); //포스트 내용
    const [postTitle, setPostTitle] = useState(); //포스트 제목
    const [writerId,setWriterId] = useState(); //글쓴이 고유 아이디
    const [writerName , setWriterName] = useState(); //글쓴이 이름
    const [heart , setHeart] = useState(0); //좋아요
    const [commentList , setCommentList] = useState([]); //댓글 모음
    const location = useLocation();
    const postScrollRef = useRef();
    const boardArr = useSelector((state)=>state.board.boardArr);
    const scrollToElement = () => postScrollRef.current.scrollIntoView({behavior: 'smooth'  ,block : 'end' });
    
    useEffect(()=> {
        console.log("loading" , loading)
        async function getPost(){
            const response = await axios.get(`https://concal.p-e.kr${location.pathname}`)
            console.log("상세보기" , response)
            if(response.status === 200){
                setBoardId(response.data.data.boardId);
                setCreatedDate(response.data.data.createdDate);
                setModifiedDate(response.data.data.modifiedDate);
                setId(response.data.data.id);
                setPostContent(response.data.data.postContent);
                setPostTitle(response.data.data.postTitle);     
                setHeart(response.data.data.postHeart);     
                setWriterId(response.data.data.writerId);
                setWriterName(response.data.data.writerName);
                setCommentList(response.data.data.commentDtoList);
            }
        }
        getPost();
        scrollToElement();
    } , [location ])

    return (
        <div className = "postContainer" ref={postScrollRef}>
            <div className = "postHead" >
                <div className = "category">
                    {boardArr[boardId - 1]}
                </div>
                <div className = "profile">
                    <img className = "profileImg" src = "/images/poster6.jpeg" alt = ""/>
                    <div className = "writeInfo">
                        <span className ="writerName">{writerName}</span>
                        <span className = "createdDate">{createdDate}</span>
                    </div>
                </div> 
                <div className = "postTitle">
                    {postTitle}
                </div>
            </div>
            <div className = "postContent">
                {postContent}
            </div>
            <Heart heartNum={heart} changeHeart = {setHeart}/>
            <Comment commentList={commentList} changeCommentList = {setCommentList}/>
        </div>
    )
}

export default Post;