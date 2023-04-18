import { Link } from 'react-router-dom';
import CommentImage from '../../../components/CommentImage/CommentImage';
import LikeImage from '../../../components/Like/LikeImage';
import styled from'./HotPostContent.module.scss'
import { useEffect } from 'react';

function HotPostContent ({boardId ,userEmail ,postTitle , like , comment , id}) {

    const checkHeart = (item , userEmail) => {
        const checkArr = item.filter((el)=> el === userEmail)
        if(checkArr.length){ //빈 배열이 아니면
            return true;
        }
        return false;
    }


    return (
        <Link to = {`boards/${boardId}/posts/${id}?page=0`} className = {styled.hotPostLink}>
            <div className = {styled.hotPostContentItemContainer}>
                <span className= {styled.hotPostContentBoardTag}>
                    {"내한 공연"}           
                </span>
                <span className= {styled.hotPostContentPostTitle}>
                    {postTitle}
                </span>
                <LikeImage number = {like.length} size = {"small"} className= {styled.likeImage} fill={checkHeart(like , userEmail)} />
                <CommentImage number = {comment} size = {"small"} className= {styled.commentImage}/>
            </div>
        </Link>
    )


}

export default HotPostContent;