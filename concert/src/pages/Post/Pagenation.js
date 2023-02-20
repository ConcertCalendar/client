import { useEffect, useState } from "react";
import './Pagenation.css'

/*
    post의 총 개수가 들어온다.
    post의 총 개수만큼 page를 만든다.
    현재 page와 한계페이지가 존재  
    

 */
function Pagenation ({currentPage, offset , totalPost }) { 
    let pageArr = [];
    const [limit , setLimit] = useState(10); //페이지 10개씩
    
    const makePaging = () => {
        const start = Math.floor(offset / 10);
        const end = start + limit;
        pageArr.slice(start,end).map((item,idx) => {
            console.log("item" , item);
            return <span className = "pagingItem">{item}</span>
        })
    }
    
     const makePageArr = () => {
        let arr = [];
        for( let i = 1 ; i <= totalPost ; i++){
            arr.push(i);
        }
        pageArr = arr;
     }

    useEffect(() => {
        makePageArr();
        console.log(totalPost)
        console.log("offset = " , offset )
    } , [ totalPost])

    return (
        <div className = "pagenationContainer">
            <div className = "paging">
                {makePaging()}
            </div>
        </div>
    )

}

export default Pagenation;