import './LikeImage.module.scss'


function LikeImage ({width, height}) {
    return (
        <div className = "likeContainer">
            <img className= 'likeImg' src = 'images/like.png' alt = "like"/>
        </div>
    )
}

export default LikeImage;