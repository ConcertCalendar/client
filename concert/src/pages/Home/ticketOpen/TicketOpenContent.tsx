import './TicketOpenContent.css'

interface TicketProps {
    children? : React.ReactNode;
    day : string;
    id : number;
    singer : string;
    title : string;
    content : string;
    interpark?: string;
    yes24?: string;
    poster : string;
}
const TicketOpenContainer:React.FC<TicketProps> = (props) => {
    const {day , singer, title , content, interpark , yes24 , poster } = props;
    return (
        <div className="ticketOpenContentItem">
            <div className='ticketOpenExPoster'>
                <div className = "ticketOpenItemHeader">
                    <span className="ticketOpenRemainDay">{day === '0' ? `D-day`: `D-${day}`}</span>
                    <span className="ticketOpenSinger"> {singer}</span>
                </div>
                <div className = 'ticketOpenItemTitle'>
                    {title}
                </div>
                <div className='ticketOpenItemContent'>
                {content}
                </div>
                <div className="ticketOpenItemFooter">
                    {yes24&&<a target = "blank" href = {yes24}> YES24 바로 가기</a>}
                    {interpark&&<a target = "blank" href = {interpark}> 인터파크 바로 가기</a>}
                </div>
            </div>
            <div className='ticketOpenItemPosterWrap'>
                <img src = {poster}alt = "" className = 'ticketOpenItemPoster'/>
            </div>  
        </div>
    )

}

export default TicketOpenContainer;