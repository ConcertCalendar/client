import { useEffect, useState } from "react";
import './Pagenation.css'

/*
    post의 총 개수가 들어온다.
    post의 총 개수만큼 page를 만든다.
    현재 page 와  
    

 */
function Pagenation ({page}) { 
    
    const makePaging = (pageNumber) => {
        return () => {
            for(let i = 0 ; i < pageNumber ; i++){
                <span className = "pagingItem">{i + 1}</span>
            }
        } 
    }
            

    useEffect(() => {        
        console.log("pageNumber = ", page);
    } , [])

    return (
        <div className = "pagenationContainer">
            <div className = "paging">
               <span className = "pagingItem">1</span>
               <span className = "pagingItem">2</span>
               <span className = "pagingItem">3</span>
               <span className = "pagingItem">4</span>
               <span className = "pagingItem">5</span>
               <span className = "pagingItem">6</span>
               <span className = "pagingItem">7</span>
               <span className = "pagingItem">8</span>
               <span className = "pagingItem">9</span>
               <span className = "pagingItem">10</span>
            </div>
        </div>
    )

}

export default Pagenation;