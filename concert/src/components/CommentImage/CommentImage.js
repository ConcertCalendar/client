import styled from'./CommentImage.module.scss';
import commentImg from '../../assets/AnyConv.com__comment.webp'
function CommentImage ({number , size , className = ''}) {
    return (
        <div className = {className}>
            <img className = {size === 'small' ? styled.smallImg : styled.img} src = {commentImg} alt = "comment"/>
            {number}
        </div>
    )
}

export default CommentImage;
