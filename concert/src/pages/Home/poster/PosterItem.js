import './PosterItem.css'

function PosterItem ({src , link , ranked}) {
   // style= {{width: width , height : height}}
    return (
        <div className='posterItemContainer'>
            <a href = {link} target = "blank"><img src = {src} className = "posterItemImage" alt = ""/></a>
            <div className='rankedOuterCircle'>
                <div className = "rankedInnerCircle">
                    {ranked}위
                </div>
            </div>
        </div>
    )
}

export default PosterItem;