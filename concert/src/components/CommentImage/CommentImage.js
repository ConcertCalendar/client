import styles from'./CommentImage.module.scss';

function CommentImage ({number}) {
    return (
        <div className = {styles.CommentImageContainer}>
            <img className={styles.CommentImage} src = 'images/AnyConv.com__comment.WEBP' alt = "comment"/>
            {number}
        </div>
    )
}

export default CommentImage;
