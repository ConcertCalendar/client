
import './Board.css'
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useLocation, useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardCategory from './BoardCatergory';
import Pagination from "react-js-pagination";
import "./Paging.css";



function Board(){
    const [boardName, setBoardName] = useState("");
    const {boardId} = useParams();
    const [loading ,setLoading] = useState(false);
    const [post,setPost] = useState([]);
    const [totalPost , setTotalPost] = useState(0);  
    const [currentPage , setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const page = useParams('page');
    const params = useParams();
    const location = useLocation();
 


    const handleTopage = (page) => {
        setCurrentPage(page)
        navigate(`?page=${page-1}`) 
    }

    useEffect( ()=> {
        async function getData(){  //커뮤니티 페이지 정보를 받아오는 코드
            const response = await axios.get(`https://concal.p-e.kr/boards/${params.boardId}${location.search}`)
            if(response.status === 200){
                console.log("board.js" , response)
                setLoading(true);
                setPost(response.data.data.boardDtoList);
                setTotalPost(Number(response.data.data.postEntireSize) );
                return; 
            }
            setLoading(false);
        }
        getData();
    }, [params.boardId  , page ,loading]);
   
//
    return (
        <>
        <Outlet/>
        <div className = "boardContainer">
            <BoardCategory boardId={boardId}/>
            <PostList data = {post} loading = {loading}/>
            <Pagination
               activePage={currentPage}
               itemsCountPerPage={20}
               totalItemsCount={totalPost}
               pageRangeDisplayed={10}
               onChange = {handleTopage}
               />
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