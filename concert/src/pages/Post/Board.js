import Pagenation from './Pagenation';
import './Board.css'
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useLocation, useParams, useSearchParams, Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


function Board(){
    const boardArr = useSelector((state)=>state.board.boardArr);
    const [boardName, setBoardName] = useState("");
    const {boardId} = useParams();
    const [loading ,setLoading] = useState(false);
    const [post,setPost] = useState([]);
    const location = useLocation();
    const [totalPost , setTotalPost] = useState(0);
    const [searchParams , setSearchParams] = useSearchParams();
    const offset = searchParams.get('page');
    const params = useParams();


    useEffect( ()=> {
        setBoardName(boardArr[boardId - 1]);
        async function getData(){
            if(offset !== null){ 
                const response = await axios.get(`https://concal.p-e.kr/boards/${params.boardId}${location.search}`)
                if(response.status === 200){
                    setLoading(true);
                    setPost(response.data.data.boardDtoList);
                    setTotalPost(Number(response.data.data.postEntireSize) );
                    return; 
                }
                setLoading(false);
            }
        }
        getData();

    }, [offset , params.boardId , totalPost]);
   

    return (
        <>
        <Outlet loading = {loading} />
        <div className = "boardContainer">
            <div className = "boardName">
                {boardName}
            </div>
            <PostList data = {post} loading = {loading}/>
            <Pagenation totalPost={Math.ceil(totalPost / 20) } offset = {offset} />
        </div>
        <div>
            <Link to ="/write" className='writingBtn' state = {{boardName : boardName , from : location.pathname + location.search , boardId : boardId  , totalPost : totalPost }}>
               <img src = "../../../images/pencil.png" alt = ""/>
            </Link>
        </div>
        </>
    )
}

export default Board;