import { useEffect , useState} from 'react'
import styled from './PostList.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LikeImage from '../../components/Like/LikeImage';
import CommentImage from "../../components/CommentImage/CommentImage"

function PostList({data , loading}) {
    const location = useLocation();
    const navigate = useNavigate();

    const makeChild = () => { /* props로 만든 data로 postList를 랜더링 하는 코드*/
       return data.length === 0 ?  //Connect는 성공했으나 아직 게시글이 없을 때 
        <div>
            게시글이 없습니다.
        </div> :
        data.map((item,idx)=> //Connect도 성공하고 게시글이 있을 때 
        <Link key = {item.id} to = {`posts/${item.id}${location.search}`} className={ (idx % 2 === 0) ? styled.postlistBox : styled.postlistBox1} >
            <div key = {item.id} className = {styled.postListItem}>
                <div className = {styled.postlistTitle}>{item.postTitle}</div>
                <p className = {styled.postlistContent}>{item.postContent}</p> 
                <CommentImage number = {item.postHeart} size = {"small"} className={styled.commentImg}/>
                <LikeImage number = {item.postHeart} size = {'small'} className={styled.likeImg}/>
            </div>
        </Link>
    )}  

    useEffect( () => {
        //setInterval(() => renderLoding(count++), 1000);
    }, [data])

    
    return (
        <div className = {loading === true ? styled.postlistContainer : styled.loadingContainer }>
           {loading ?  makeChild() : "loading"}
        </div>
    )
}

export default PostList;