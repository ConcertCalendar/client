import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Pagenation.css'

/*
    post의 총 개수가 들어온다.
    post의 총 개수만큼 page를 만든다.
    현재 page와 한계페이지가 존재  
    

 */
function Pagenation ({currentPage, offset , totalPost }) {

    let [pageArr,setPageArr] = useState([]);
    const [limit , setLimit] = useState(10); //페이지 10개씩
    
    const makePaging = () => {
        const start  = parseInt((offset) / 10) * 10;
        return pageArr.slice(start ,start+limit).map((item) =>
        <Link key = {item} to = {`?page=${item-1}`} className={Number(offset) === item-1 ?"currentPagingItem":"pagingItem"}>
            <p>{item}</p>
        </Link>
        )}
    
     const makePageArr = () => { // totalpost는 post 총 개수를 10으로 나눈 값 
        let arr = [];
        for( let i = 1 ; i <= totalPost ; i++){
            arr.push(i);
        }
         setPageArr([...arr]);
     }

    useEffect(() => {
        makePageArr();
    } , [])

    return (
        <div className = "pagenationContainer">
            <div className = "paging">
                {makePaging()}
            </div>
        </div>
    )

}

export default Pagenation;