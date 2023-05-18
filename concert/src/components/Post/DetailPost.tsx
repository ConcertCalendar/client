import CommentList from 'pages/BulletinBoard/CommentList';
import styled from './DetailPost.module.scss';
import Heart from 'pages/BulletinBoard/Heart';
import { useState , useEffect} from 'react';
import { axiosInstance } from 'utils/customAxios';
import { changePostDateFormat } from 'utils/dateUtils';
import Loading from 'components/loading';
import { changeBoardId } from 'utils/boardId';
import UserProfile from 'components/User/UserProfile';
import PostMenu from './PostMenu';
import Mark from 'components/Mark/Mark';
import Notification from 'components/notification/Notification';
import Link from 'components/Link/Link';

interface DetailPostProps{
    childern : React.ReactNode;
}
const DetailPost:React.FC<DetailPostProps> = () => {
    const [boardId, setBoardId] = useState<number>(-1);  // board 고유 번호
    const [createdDate,setCreatedDate] = useState<string>(""); // 포스트 생성 날짜
    const [modifiedDate,setModifiedDate] = useState<string>(""); //포스트 수정 날짜
    const [id,setId] = useState<number>(-1); //게시글 고유 번호
    const [postContent,setPostContent] = useState<string>(""); //포스트 내용
    const [postTitle, setPostTitle] = useState<string>(""); //포스트 제목
    const [writerId,setWriterId] = useState<number>(-1); //글쓴이 고유 아이디
    const [writerName , setWriterName] = useState<string>(""); //글쓴이 이름
    const [heart , setHeart] = useState<Array<string>>([]); //좋아요
    const [commentList , setCommentList] = useState<Array<string>>([]); //댓글 모음 
    const [loading , setLoading ] = useState<boolean>(false);

    const getPost = async() => {
       axiosInstance.get('/boards/1/posts/1')
       .then((res)=> {
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
            setLoading(true);
       })
       .catch((err)=>{
        console.log(err);
       })
    }
    useEffect(() => {
        getPost();
    } , [])

    return (
        <div>
            {
                loading ?  //로딩이 완료 되면
                <section className = {styled.detailPostContainer}>
                    <div className = {styled.postHead}>
                        <p className={styled.boardCategory}>{changeBoardId(boardId)}</p>
                        <p className = {styled.createdDate}>{changePostDateFormat(createdDate)}</p>
                        <UserProfile className = {styled.userProfile} nickName = {writerName} />
                        <div className={styled.notiMenu}>
                            <Mark/>
                            <Notification/>
                            <Link/>
                        </div>
                        <div className = {styled.postTitle}>
                            {postTitle}
                        </div>
                        <div className = {styled.modiMenu}>
                            <PostMenu visible = {true}/>      
                        </div>      
                    </div>
                    <div className = "postContent">
                        {postContent}
                    </div>
                    <Heart boardId={boardId} postId={id} heartSet = {heart} />
                    <CommentList commentList={commentList} changeCommentList = {setCommentList}/>
                </section>
                :
                <section className = {styled.loadingContainer}>
                    <Loading/>
                </section>
            }
        </div>
    )
}

export default DetailPost; 