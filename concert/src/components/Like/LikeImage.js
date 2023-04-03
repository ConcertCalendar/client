import styled from'./LikeImage.module.scss';
import likeImg from '../../assets/AnyConv.com__like.webp'
function LikeImage ({number, className = '' , size }) {
    return (
        <div className = {className}>
            <img className = {size === 'small' ? styled.smallImg : styled.img} src = {likeImg} alt = "like"/>
            {number}
        </div>
    )
}

export default LikeImage;