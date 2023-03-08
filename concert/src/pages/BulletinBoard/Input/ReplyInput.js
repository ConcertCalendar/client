import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './ReplyInput.css';
function ReplyInput({toReply , commentId , commentList , changeCommentList}) {
    const location = useLocation();
    const [content, setContent] = useState("");
    const [nickname,setNickname] = useState("user");
    const [currentLength , setCurrentLength] = useState(0);
    const token = useSelector((state)=> state.auth.accessToken);
    const postReply = async () => {
        await axios.post(`https://3.34.81.44:8080/comments/${commentId}/replies`, {
            "replyContent" : content,
        } ,
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
            }
        }).then((res) =>{
            if(res.status === 200){
                axios.get(`https://3.34.81.44:8080${location.pathname}`)
                .then((res)=> {
                    if(res.status === 200) 
                        changeCommentList(res.data.data.commentDtoList)
                })
                .catch((err)=>console.log(err))
            }
            setContent("");
        }).catch((err)=> console.log("replyerror",err));
    
    }
    const handleReplyInputBtn = (event) => {
        event.preventDefault();
        if(content === ""){
            alert("댓글을 입력해주세요.") 
            return;
        }  
        postReply();
    }
    
    const handleLength = (event) => {
        setContent(event.target.value);
        setCurrentLength(event.target.value.length);
    }

    return(
        <div className="replyInputContainer">
            <p className = "replyTitle"> @{toReply} </p>
            <form className = "replyForm"> 
                <span className = "replyUser">{nickname}</span>
                <textarea
                className = "replyInput"
                placeholder='댓글을 입력하세요'
                maxLength = {299}
                onChange = {handleLength}
                value = {content}
                />
                <div className = "inputFooter">
                    <button 
                    className = "replyPostBtn"
                    onClick = {handleReplyInputBtn}>
                        등록
                    </button>
                    <p className = "currentLength">{currentLength}/300</p>
                </div>
            </form>
        </div>
    )

}

export default ReplyInput;