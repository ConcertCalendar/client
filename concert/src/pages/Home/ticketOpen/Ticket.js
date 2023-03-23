import { useState } from 'react';
import PostModalHeader from '../PostModalHeader.js';
import './Ticket.css';
import TicketOpenContainer from './TicketOpenContent.js';

function Ticket() {
    const [dummy, setDummy] = useState([
        {   
            "id" : 1,
            "day" : "35" ,
            'singer' : "해리 스타일스 (Harry Styles)",
            'title' : "해리 스타일스 첫 내한 공연 (HARRY STYLES LOVE ON TOUR 2023 - Live In Seoul)",
            'content' :  "드디어 온다 해리 스타일스의 첫 내한 공연",
            'buy' : 'https://tickets.interpark.com/goods/22016203',
            'poster' : 'images/AnyConv.com__poster3.WEBP',
        }])
    const makeTicketOpenContent = () => {
        return dummy.map((item) => 
        <TicketOpenContainer key = {item.id} day = {item.day} singer ={item.singer} title = {item.title} content = {item.content} buy = {item.buy} poster = {item.poster}/> 
        )
    } 
    return (
        <article className = "TicketOpenContainer">
            <PostModalHeader imgsrc = {"images/ticket.png"} title = {"티켓 오픈"} seeMore = {"/boards/1?page=0"}/>
            <div className = "ticketOpenContentContainer">
               {makeTicketOpenContent()}
            </div>
        </article>
    )
}

export default Ticket;

