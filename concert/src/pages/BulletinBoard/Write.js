import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { authInstance } from '../../utils/customAxios';
import { isAuth } from '../../utils/JwtUtils';
import './Write.css'
function Write () {
    const {state} = useLocation();
    const contentRef = useRef(null);
    const [postTitle , setPostTitle] = useState("");
    const [postContent , setPostContent] = useState("");
    const [resize, setResize] = useState(580);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const handleChange = (e) => {
        setPostContent(e.target.value);
        setResize(contentRef.current.scrollHeight )
    }
    
    const handleChangeTitle = (e) => {
        setPostTitle(e.target.value);
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
        isAuth(accessToken)&&authInstance(accessToken).post('/posts', { 
            'boardId': state.boardId,
            'postTitle': postTitle,
            'postContent': postContent,
        }).then((res)=> {
            console.log(res)
        }).catch((err)=>{
            console.log(err);
        }
        )
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
                    <textarea className = "writeTitle" onChange={handleChangeTitle} value = {postTitle}/>
                    <textarea ref = {contentRef} className = "writeContent" onChange={handleChange} value = {postContent}/>
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