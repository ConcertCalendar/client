import { ReactNode, useEffect, useState } from "react";
import { axiosInstance } from "utils/customAxios";
import styled from './Board.module.scss';
import PostListTest from "components/PostList/PostListTest";
import PostListHeader from "components/PostList/PostListHeader";
import Pagination from 'react-js-pagination'
import Loading from "components/loading";
import writeImg from 'assets/pencil.png'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BoardNav from "components/BoardNav/BoardNav";
import BoardExp from "components/BoardExp/BoardExp";
import "../../components/Pagination/Paging.css";


interface BoardProps {
    childern ?: React.ReactNode;
}
interface boardDataItem {
    boardId : number;
    commentSize : number;
    createdDate : string | Date;
    id : number;
    modifiedDate : string|Date|null;
    postContent : string;
    postHeartSet : Array<string>;
    postHeartSize : number;
    postTitle : string;
    writerId : number;
    writerName : string;
}
const Board:React.FC<BoardProps> = (props) => {
    const [boardData, setBoardData] = useState<Array<boardDataItem>>([]);
    const [totalPost, setTotalPost] = useState<number>(0);
    const [loading , setLoading] = useState<boolean>(false);
    const [currentPage , setCurrentPage] = useState<number>(1);
    const location = useLocation();
    const param = useParams();
    const navigate = useNavigate();

    const handleTopage = (page:number) => {
        navigate(`?page=${page-1}`) 
    }

    const getBoard = async() => {
        axiosInstance.get(`${location.pathname}${location.search}`)
        .then((res)=> {
            setTotalPost(res.data.data.postEntireSize)
            setBoardData(res.data.data.boardDtoList);
            setCurrentPage(Number(location.search.slice(6)) + 1);
            setLoading(true);
        })
        .catch((err)=> console.log(err))
    }
    
    const clickList = (id:number) => {
        navigate(`posts/${id}`)
    }

    const clickWriteBtnhandler = () => {
        navigate('/write')
    }

    const makePostList = () => {
        return boardData.map((item) => (
                <PostListTest key = {item.id} onClick = {clickList.bind(this,item.id)} boardId={item.boardId} commentSize={item.commentSize} createdDate={item.createdDate}
                 id={item.id} modifiedDate={item.modifiedDate} postTitle={item.postTitle} writerName={item.writerName}/>
            ))
    }

    useEffect(() => {
        getBoard();

    }, [location , param])

    return (
        <section className={styled.boardContainer}>
        {loading ? 
            <>
                <BoardNav boardId={boardData[0].boardId}/>
                <BoardExp explanation="게시판 설명"/>
                <PostListHeader/>
                {makePostList()}    
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={20}
                totalItemsCount={totalPost}
                pageRangeDisplayed={10}
                onChange = {handleTopage}
                />
                <div className = {styled.write}  onClick={clickWriteBtnhandler}>
                    +
                </div>
               
            </>
        :
            <Loading className={styled.loading}/>
        }
        </section> 
    )
}

export default Board;