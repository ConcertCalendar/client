import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Write.css'
function Write () {
    const {state} = useLocation();
    const contentRef = useRef(null);
    const [resize, setResize] = useState(580);
    
    const handleChagne = () => {
        setResize(contentRef.current.scrollHeight )
    }

    const makeCategory = () => {
        if(state.boardName === "공연 후기 게시판")
            return (
                <div className ="selectWrap"> 
                    <select className = "concertSelect">
                        <option value = ""> 공연 선택 </option>
                        <option value = "공연1">공연1</option>
                        <option value = "공연2">공연2</option>
                    </select>            
                </div>
            )
    }

    const postWrite = () => {


    }

    useEffect(()=> {
        contentRef.current.style.height = resize + 'px';
    },[resize]);

    return (
    <div className="WriteContainer">
        <article className =  "writeForm">
            <section className = "sectionContainer">
                <div className = "writeHeader">
                    <span  className = "WriteCommnuityName">{state.boardName}</span>
                    {makeCategory()}</div>
                <div className = "contentContainer">
                    <textarea className = "writeTitle"/>
                    <textarea ref = {contentRef} className = "writeContent" onChange={handleChagne}/>
                </div>
            </section>
        </article>
        <div>
            <Link to = {state.from} className='writingBtn' onClick={postWrite}>
               <img src = "../../../images/pencil.png" alt = ""/>
            </Link>
        </div>    
    </div>) 
}
export default Write;