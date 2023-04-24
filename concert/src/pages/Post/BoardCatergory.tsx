import {useState} from 'react';
import styled from './BoardCategory.module.scss'
import { Link } from 'react-router-dom';


interface BoardCategoryProps {
    childern : React.ReactNode;
    boardId : number;
}

const BoardCategory:React.FC<BoardCategoryProps> = (props) => {
    const {boardId} = props;
    const [boardArr,setBoardArr] = useState<Array<string>>(['자유 게시판' , '공연 후기 게시판']);


    const makeCategory = () => {
        return boardArr.map((item , idx) =>(
            (boardId-1)  === idx   ? 
            <li className= {styled.selectedCategoryLi} key ={idx}>
                <Link className ={styled.selectedCategoryLink} to = {`../boards/${idx+1}?page=0`}>{item}</Link> 
            </li>
            
            :
            <li className= {styled.categoryLi} key = {idx}>
                <Link className = {styled.categoryLink} to = {`../boards/${idx+1}?page=0`}>{item}</Link> 
            </li>
        ))
    }

    return (
        <div className= {styled.boardCategoryContainer}>
            <ul className = {styled.categoryUl}>
                {makeCategory()}
            </ul>
        </div>
    )

}

export default BoardCategory;