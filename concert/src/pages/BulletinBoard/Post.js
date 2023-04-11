import './Post.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import CommentList from './CommentList';
import Heart from './Heart';
import { axiosInstance } from '../../utils/customAxios';
import { changePostDateFormat } from 'utils/dataUtils';
/*type PostProps = {
    loading?: Boolean; 
};*/

function Post( {loading} ) {
    const accessToken = useSelector((state)=> state.auth.accessToken);
    const [boardId, setBoardId] = useState();  // board 고유 번호
    const [createdDate,setCreatedDate] = useState(); // 포스트 생성 날짜
    const [modifiedDate,setModifiedDate] = useState(null); //포스트 수정 날짜
    const [id,setId] = useState(); //게시글 고유 번호
    const [postContent,setPostContent] = useState(); //포스트 내용
    const [postTitle, setPostTitle] = useState(); //포스트 제목
    const [writerId,setWriterId] = useState(); //글쓴이 고유 아이디
    const [writerName , setWriterName] = useState(); //글쓴이 이름
    const [heart , setHeart] = useState([]); //좋아요
    const [heartState , setHeartState] = useState();
    const [commentList , setCommentList] = useState([]); //댓글 모음
    const location = useLocation();
    const postScrollRef = useRef();
    const boardArr = useSelector((state)=>state.board.boardArr);
    
    const [format,setFormat] = useState("");

    const scrollToElement = () => postScrollRef.current.scrollIntoView({behavior: 'smooth'  ,block : 'end' });
    
    useEffect(()=> {
        console.log("loading" , accessToken)
        async function getPost(){
            await axiosInstance.get(location.pathname)
            .then(res=> {
                if(res.status === 200){
                    setBoardId(res.data.data.boardId);
                    setCreatedDate(changePostDateFormat(res.data.data.createdDate));
                    setModifiedDate(res.data.data.modifiedDate);
                    setId(res.data.data.id);
                    setPostContent(res.data.data.postContent);
                    setPostTitle(res.data.data.postTitle);     
                    setHeart(res.data.data.postHeartSet);     
                    setWriterId(res.data.data.writerId);
                    setWriterName(res.data.data.writerName);
                    setCommentList(res.data.data.commentDtoList);
                    setFormat(res.data.data.createdDate);
                }
        })}
        getPost();
        scrollToElement();
    } , [location])

    return (
        <div className = "postContainer" ref={postScrollRef}>
            <div className = "postHead" >
                <div className = "category">
                    {boardArr[boardId - 1]}
                </div>
                <div className = "profile">
                    <img className = "profileImg" src = "/images/AnyConv.com__poster6.WEBP" alt = ""/>
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
            <Heart boardId={boardId} postId={id} heartSet = {heart} setHeartSet = {setHeart} />
            <CommentList commentList={commentList} changeCommentList = {setCommentList}/>
        </div>
    )
}

export default Post;