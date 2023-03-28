import './LikeImage.module.scss';

function LikeImage ({width, height}) {
    return (
        <div className = "likeImageWrap">
            <img className="likeImage" src = 'images/like.png' alt = "like"/>
        </div>
    )
}

export default LikeImage;