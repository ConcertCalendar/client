
import { ContentContainer } from '@fullcalendar/core/internal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Comment.css'

function Comment ({commentList , changeCommentList}) {
    const location = useLocation();
    const token = useSelector((state)=>state.auth.accessToken);
    const [content, setContent] = useState("");
    const [nickname,setNickname] = useState("user");
    const [currentLength , setCurrentLength] = useState(0);
    const postComment = async () => {
            await axios.post(`http://3.37.69.149:8080${location.pathname}/comments` ,{
            "commentContent" : content,
        } ,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }
        }).then((res)=>{
            if(res.status === 200){
                axios.get(`http://3.37.69.149:8080${location.pathname}`)
                .then((res)=> {
                    if(res.status === 200) 
                        changeCommentList(res.data.data.commentDtoList)
                })
                .catch((err)=>console.log(err))
            }   
            setContent("");
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const handleInputBtn = (event) => {
        event.preventDefault();
        if(content === ""){
            alert("댓글을 입력해주세요.") 
            return;
        }  
        postComment();
        
    }
    
    const handleLength = (event) => {
        setContent(event.target.value);
        setCurrentLength(event.target.value.length);
    }


    const renderCommentList = () => {
        return commentList.map((comment,idx) => (
            <div className = "commentBox" key = {idx}>
                <div className='commentProfile'>
                    <img className = "commentImg" src = "/images/poster6.jpeg" alt = ""/>
                    <p className = "commentName">{comment.commentWriterName}</p>
                </div>
                <p className = "commentContent">{comment.commentContent}</p> 
                <p className = "commentCreatedDate">{comment.createdDate}</p>
            </div>
        ))
    }
    useEffect( ()=> {
        
    } , [commentList]);

    return (
    <div className='commentContainer'>
        <div className="CommentInputContainer">
            <p className = "commentTitle"> 댓글 </p>
            <form className = "commentForm"> 
                <span className = "commentUser">{nickname}</span>
                <textarea
                className = "commentInput"
                placeholder='댓글을 입력하세요'
                maxLength = {299}
                onChange = {handleLength}
                value = {content}
                />
                <div className = "inputFooter">
                    <button 
                    className = "commentBtn"
                    onClick = {handleInputBtn}>
                        등록
                    </button>
                    <p className = "currentLength">{currentLength}/300</p>
                </div>
                
            </form>
        </div>
        <div className='commentListContainer'>
            {renderCommentList()}
        </div>
    </div>
    ) 
}
export default Comment;