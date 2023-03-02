import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './CommentInput.css'
function CommentInput({commentList , changeCommentList})  {
    const location = useLocation();
    const [content, setContent] = useState("");
    const [nickname,setNickname] = useState("user");
    const [currentLength , setCurrentLength] = useState(0);
    const token = useSelector((state)=>state.auth.accessToken);

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
                    console.log(res);
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

    return(
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
    )
}

export default CommentInput;