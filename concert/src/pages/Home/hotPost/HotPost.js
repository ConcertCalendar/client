import './HotPost.css'
import PostModalHeader from '../PostModalHeader.js';
import { useState } from 'react';
import HotPostContent from './HotPostContent';

function HotPost() {
    const [dummy, setDummy] = useState([
        {
            'boardId' : "1", //자유 게시판
            'id' : "1", //postId
            'postTitle' : "Hot 게시판 Title1", //제목
            'like' : '3', //좋아요 수
            'reply' : '13',  //댓글 수

        },
        {
            'boardId' : '2', // 공연 후기 게시판 
            'id' : "2", //postId
            'postTitle' : "Hot 게시판 Title2", //제목
            'like' : '3', //좋아요 수
            'reply' : '13',  //댓글 수
        },
        {
            'boardId' : "1", //자유 게시판
            'id' : "3", //postId
            'postTitle' : "Hot 게시판 Title3", //제목
            'like' : '3', //좋아요 수
            'reply' : '13',  //댓글 수

        },
        {
            'boardId' : '2', // 공연 후기 게시판 
            'postTitle' : "Hot 게시판 Title4", //제목
            'id' : "4", //postId
            'like' : '3', //좋아요 수
            'reply' : '13',  //댓글 수
        },
        {
            'boardId' : "1", //자유 게시판
            'id' : "5", //postId
            'postTitle' : "Hot 게시판 Title5", //제목
            'like' : '3', //좋아요 수
            'reply' : '13',  //댓글 수
        }
    ]);
    const makeHotPostContent = () => {
        return dummy.map((item) => 
            <HotPostContent boardId = {item.boardId} postTitle = {item.postTitle} like = {item.like} reply = {item.reply} id = {item.id}/>
        )
    }

    return (
        <article className = "hotPostContainer">
            <PostModalHeader imgsrc = {"images/fire.png"} title = {"HOT 게시판"} seeMore = {"/boards/1?page=0"}/>
            <div className = "hotPostContentContainer">
                {makeHotPostContent()}
            </div>
        </article>
    )
}

export default HotPost;