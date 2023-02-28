import './Reply.css'
function Reply({commentId , createdDate , id ,modifiedDate ,replyContent , replyWriterId , replyWriterName}) {
    return (
        <div className = "replyContainer">
            <img className = "replyImg" scr = "/images/reply.png" alt = ""/>
            <div className = "replyBox">
                <div className='replyProfile'>
                    <img className = "replyProfileImg" src = "/images/poster6.jpeg" alt = ""/>
                    <p className = "replyName">{replyWriterName}</p>
                </div>
                <p className = "replyContent">{replyContent}</p> 
                <p className = "replyCreatedDate">{createdDate}</p>
            </div>
        </div>
    )

} 

export default Reply;




