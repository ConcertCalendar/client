import { useLocation, useNavigate } from 'react-router-dom';
import styled from './BoardNav.module.scss';

/* 게시판 네비게이션 컴포넌트*/

interface BoardNavProps {
    childern ?: React.ReactNode;
    boardId ?: number;
}
const BoardNav:React.FC<BoardNavProps> = (props) => {
    const {boardId} =  props;
    const navigate = useNavigate();
    

    const onClickboardNavHandler = (id : number) => {
        navigate(`../boards/${id}?page=0`)
    } 

    return (
        <section className = {styled.boardNavContainer}>
            <div className = {boardId === 0 ?  styled.selectdBoardNavItem : styled.boardNavItem} onClick={onClickboardNavHandler.bind(this, 0)}>전체 게시판</div>
            <div className = {boardId === 1 ?  styled.selectdBoardNavItem : styled.boardNavItem} onClick={onClickboardNavHandler.bind(this,1)}>자유 게시판</div>
            <div className = {boardId === 2 ?  styled.selectdBoardNavItem : styled.boardNavItem} onClick={onClickboardNavHandler.bind(this,2)}>후기 게시판</div>
            <div className = {boardId === 3 ?  styled.selectdBoardNavItem : styled.boardNavItem} onClick={onClickboardNavHandler.bind(this,3)}>추천 게시판</div>
        </section>
    )
}

export default BoardNav;