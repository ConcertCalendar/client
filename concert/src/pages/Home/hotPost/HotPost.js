import './HotPost.css'
import PostModalHeader from '../PostModalHeader.js';
import { useEffect, useState } from 'react';
import HotPostContent from './HotPostContent';
import { axiosInstance } from '../../../utils/customAxios';
import { useMemo } from 'react';

/** 메인에 핫게시판을 띄워준다**/

function HotPost() {
    const [hotPostList, setHotPostList] = useState([]);
    
    const getHotPost= ()=> {
        axiosInstance.get('/posts/ranking')
        .then((res)=>{
            if(res.status===200){
                setHotPostList(res.data.data)
            }
        })
        .catch((err)=>console.log(err))
    }
    useEffect( ()=>{
        getHotPost();
    }, [])

    const makeHotPostContent = () => {
        return hotPostList.map((item) => 
            <HotPostContent key = {item.id} boardId = {item.boardId} postTitle = {item.postTitle} like = {item.postHeartSet.length} comment = {item.commentDtoList.length} id = {item.id}/>
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