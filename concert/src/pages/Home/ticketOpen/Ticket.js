import PostModalHeader from '../PostModalHeader.js';
import './Ticket.css';

function Ticket() {
    return (
        <article className = "TicketOpenContainer">
            <PostModalHeader imgsrc = {"images/ticket.png"} title = {"티켓 오픈"} seeMore = {"/boards/1?page=0"}/>
            <div className = "ticketOpenContent"></div>
        </article>
    )
}

export default Ticket;

