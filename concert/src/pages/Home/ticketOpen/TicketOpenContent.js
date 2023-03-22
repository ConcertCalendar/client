import './TicketOpenContent.css'
function TicketOpenContainer ({day , singer, title , content, buy , poster })  {
    return (
        <div className="ticketOpenContentItem">
            <div className='ticketOpenExPoster'>
                <div className = "ticketOpenItemHeader">
                    <span className="ticketOpenRemainDay">D-{day}</span>
                    <span className="ticketOpenSinger"> {singer}</span>
                </div>
                <div className = 'ticketOpenItemTitle'>
                    {title}
                </div>
                <div className='ticketOpenItemContent'>
                {content}
                </div>
                <div className="ticketOpenItemFooter">
                    <a target = "blank" href = {buy}> 인터파크 티켓 바로 가기</a>
                    <a target = "blank" href = {buy}> 인터파크 티켓 바로 가기</a>
                    <a target = "blank" href = {buy}> 인터파크 티켓 바로 가기</a>
                </div>
            </div>
            <div className='ticketOpenItemPosterWrap'>
                <img src = {poster}alt = "" className = 'ticketOpenItemPoster'/>
            </div>  
        </div>
    )

}

export default TicketOpenContainer;