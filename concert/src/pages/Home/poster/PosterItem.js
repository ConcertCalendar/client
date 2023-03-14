import './PosterItem.css'

function PosterItem ({src , link}) {
    return (
        <>
            <a href = {link} target = "blank"><img src = {src} className = "posterItemImage" alt = ""/></a>
        </>
    )
}

export default PosterItem;