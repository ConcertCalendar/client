import styled from'./LikeImage.module.scss';
import likeImg from '../../assets/AnyConv.com__like.webp'
import fillImg from '../../assets/AnyConv.com__fillheart.webp'
function LikeImage ({number, className = '' , size ,  fill}) {
    return (
        <div className = {className}>
            <img className = {size === 'small' ? styled.smallImg : styled.Img} src = {fill ? fillImg : likeImg} alt = "like"/>
            {number}
        </div>
    )
}

export default LikeImage;