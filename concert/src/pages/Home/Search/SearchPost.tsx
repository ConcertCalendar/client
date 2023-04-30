import { changePostDateFormat } from 'utils/dateUtils';
import styled from './SearchPost.module.scss'
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
interface SaerchPostProps{
    childern ?: React.ReactNode;
    boardId : number;
    commnetSize : number;
    createdDate : Date |string;
    id : number;
    modifiedDate : null| Date| number | string;
    postContent : string;
    postHeartSet : Array<string>;
    postHeartSize : number;
    postTitle : string;
    writerId : number;
    writerName : string;
}



const SearchPost:React.FC<SaerchPostProps> = (props) => {
    const {boardId , commnetSize, createdDate, id, modifiedDate, postContent,
    postHeartSet , postHeartSize, postTitle, writerId, writerName} = props;
    const navigate = useNavigate();


    useEffect(()=> {
        console.log(createdDate)
    },[])
    
    const handletoLink = () => {
        navigate(`../boards/${boardId}/posts/${id}?page=0`)


    }

    return (
    <div className = {styled.searchPostContainer}>
        <div className={styled.postInfo}>
            <span className = {styled.name}>{writerName}</span>
            <span className = {styled.date}>{changePostDateFormat(createdDate)}</span>
        </div>
   
        <div className={styled.postTitle}>
            <a href = {`../boards/${boardId}/posts/${id}?page=0`} target = {'_blank'} className={styled.link}>{postTitle}</a>
        </div>
        <div className={styled.postContent}>
            {postContent}
        </div>
    </div>
    )


}


export default SearchPost;