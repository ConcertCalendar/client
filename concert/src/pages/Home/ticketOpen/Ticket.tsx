import { useEffect, useState } from 'react';
import PostModalHeader from '../PostModalHeader.js';
import './Ticket.css';
import { axiosInstance } from 'utils/customAxios.js';
import TicketOpenContainer from './TicketOpenContent';
import { changeCalendarDateFormat } from 'utils/dateUtils';


const Ticket:React.FC = () =>  {
    const [day, setDay] = useState<string>("");
    const [id, setId ] = useState<number>(0);
    const [singer, setSinger] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [interPark, setInterPark] = useState<string>("");
    const [yes24, setYes24] = useState<string>("");
    const [poster, setPoster] = useState<string>("");
 
    useEffect(() => {
        async function getTicketOpen () {
        const res = await axiosInstance.get("/calendar/nextEvent");
        if(res.status === 200){
            console.log(res);
            setId(res.data.data.conNo);
            setSinger(res.data.data.singer);
            setDay(changeCalendarDateFormat(res.data.data.concertTime.conStart));
            setTitle(res.data.data.conTitle);
            setInterPark(res.data.data.bookingLink.interparkLink);
            setYes24(res.data.data.bookingLink.yes24Link);
            setPoster(res.data.data.posterUrl);
            setContent(res.data.data.conPlace);
            }
            return;
        }
        getTicketOpen();
    }, [id]);


    return (
        <article className = "TicketOpenContainer">
            <PostModalHeader imgsrc = {"images/ticket.png"} title = {"임박한 공연"}/>
            <div className = "ticketOpenContentContainer">
                <TicketOpenContainer id = {id} day = {day} singer ={singer} title = {title}
                 content = {content} yes24 = {yes24} interpark={interPark} poster = {poster}/> 
            </div>
        </article>
    )
}

export default Ticket;

