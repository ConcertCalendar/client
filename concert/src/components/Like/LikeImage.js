import styles from'./LikeImage.module.scss';

function LikeImage ({number}) {
    return (
        <div className = {styles.likeImageContainer}>
            <img className={styles.likeImage} src = 'images/AnyConv.com__like.WEBP' alt = "like"/>
            {number}
        </div>
    )
}

export default LikeImage;