import Pagenation from './Pagenation';
import './Board.css'
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useLocation, useParams, useSearchParams, Outlet, useMatch } from 'react-router-dom';
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
                const response = await axios.get(`http://3.37.69.149:8080/boards/${params.boardId}${location.search}`)
                if(response.status === 200){
                    console.log(response);
                    setLoading(true);
                    setPost(response.data.data.boardDtoList);
                    setTotalPost(Math.ceil(Number(response.data.data.postEntireSize) / 20));
                    return; 
                }
                setLoading(false);
            }
        }
        getData();

    }, [offset , params.boardId ]);
   

    return (
        <>
        <Outlet/>
        <div className = "boardContainer">
          
            <div className = "boardName">
                {boardName}
            </div>
            <PostList data = {post} loading = {loading}/>
            <Pagenation totalPost={totalPost } offset = {offset} />
        </div>
        </>
    )
}

export default Board;