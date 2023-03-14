import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid';
import { createElement, useEffect, useState } from "react";
import './Calendar.css'
import CalendarModal from "./CalendarModal";
import mocksdata from '../../assets/MOCK_DATA.json';

function MyCalendar() {
    const [event , setEvents] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [content , setContent] = useState({});
    const handleEventEnter = (e) => {
    }

    const handleEventClick = (e) => {
        console.log(e)
        setOpenModal(true)
        const id =  parseInt(e.event._def.publicId) //string을 number로 바꿔줌 
        const result = event.filter( (el) => el.id === id) //클릭한 e와 event를 비교하여 같은 id 값을 가진 정보를  result에 저장 
        setContent(result[0]) //result[0] 즉 id가 일치하는 events를 props의 content로 넘겨주기 위해 저장
        const body = document.getElementById("body") //body에 ClassName을 추가하여 modal과 구분하기 위해
        body.classList.add('overflowHidden')
        //alert(e.event._def.publicId + e.event._def.title)
    }
 /* 
    */
    const changeProperty = () => {
        let mockdata = mocksdata.map((item)=>{
            let obj = {
                id : item.id,
                title : item.title,
                start : item.start_date,
                end : item.end_date + "T23:59:00",
                runtime : item.time,
                singer : item.singer,
                place : item.place,
                img : "images/poster2.jpeg",
                color : `rgb(121,123,322,0.${item.id})`,
                ticket : item.ticket,
            }  
            return obj;
        })
        return mockdata;
    }

    useEffect( () => {
        const events = changeProperty();
        console.log(events)
        setEvents(events);
    }, [] );

    return (
        <div className = "calendarContainer">
            <FullCalendar   
                initialView="dayGridMonth" 
                plugins={[ dayGridPlugin , interactionPlugin ]}
                timeZone = 'Asia/Seoul'
                events = {event}
                dayMaxEvents = {3}
                eventClick = {handleEventClick}
                eventMouseEnter = {handleEventEnter}
            />
            {openModal && <CalendarModal closeModal={setOpenModal} title = {content.title}>
                <img src={content.img} alt = ""/>
                    <div className = "concertContent">
                     <p> 가수 : {content.singer}</p>
                     <p> 공연 기간 : {content.start}  ~ {content.end}</p>
                     <p> 공연 시간 : {content.runtime}</p>
                     <p> 장소 : {content.place}</p>  
                     <p> 예매 사이트 : <a href = {content.ticket}>{content.ticket}</a></p>
                </div> 
            </CalendarModal>}
        </div>
    )

}

export default MyCalendar;