import './PosterItem.css'

interface posterItemProps {
    childern ?: React.ReactNode;
    src ?: string;
    link ?: string;
    ranked ?: number;
}
const PosterItem : React.FC <posterItemProps> =  (props) => {
    const {src , link , ranked} = props;
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