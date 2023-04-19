import { useEffect , useState} from 'react'
import styled from './PostList.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LikeImage from '../../components/Like/LikeImage';
import CommentImage from "../../components/CommentImage/CommentImage"
import { changePostDateFormat } from 'utils/dateUtils';
import Loading from 'components/loading';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Data {
    id: number;
    boardId : number;
    commentSize : number; 
    createdDate : string;
    modifiedDate: null | string;
    postContent: string; 
    postHeartSet : Array<string>;
    postHeartSize : number;
    postTitle : string; 
    writerId : number; 
    writerName  : string;
}

interface postListProps {
    childern?: React.ReactNode;
    data : Array<Data>;
    loading : boolean;
}

const PostList : React.FC<postListProps> = (props) => {
    const {data , loading} = props;
    const currentUserEmail = useSelector((state:RootState) => state.login.currentUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    
    const checkHeart = (item : Array<string> , userEmail : string) => {
        const checkArr = item.filter((el)=> el === userEmail)
        if(checkArr.length){ //빈 배열이 아니면
            return true;
        }
        return false;
    }

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
                <div className = {styled.postFooter}>
                    <CommentImage number = {item.commentSize} size = {"small"} className={styled.commentImg}/>
                    <LikeImage  fill = {checkHeart(item.postHeartSet , currentUserEmail)} number = {item.postHeartSize} size = {'small'} className={styled.likeImg}/>
                    <div className = {styled.date}>{changePostDateFormat(item.createdDate)}</div>
                </div>
            </div>
        </Link>
    )}  

    return (
        <div className = {loading === true ? styled.postlistContainer : styled.loadingContainer }>
           {loading ?  makeChild() : <Loading className={styled.loading}/>}
        </div>
    )
}

export default PostList;