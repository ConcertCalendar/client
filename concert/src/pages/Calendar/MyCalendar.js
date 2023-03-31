import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from "react";
import styled from './Calendar.module.scss'
import CalendarModal from "./CalendarModal";
import mocksdata from '../../assets/MOCK_DATA.json';

function MyCalendar() {
    const [event , setEvents] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [content , setContent] = useState({});
    const [pageXY , setPageXY] = useState([]);
    const handleEventEnter = (e) => {
    }

    const handleEventClick = (e) => {
        setOpenModal(true)
        setPageXY([e.jsEvent.pageX, e.jsEvent.pageY])
        const id =  parseInt(e.event._def.publicId) //string을 number로 바꿔줌 
        const result = event.filter((el) => el.id === id) //클릭한 e와 event를 비교하여 같은 id 값을 가진 정보를  result에 저장 
        setContent(result[0]) //result[0] 즉 id가 일치하는 events를 props의 content로 넘겨주기 위해 저장
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
                end : item.end_date ,
                runtime : item.time,
                singer : item.singer,
                place : item.place,
                img : "images/AnyConv.com__poster6.WEBP",
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

    const dateClickInfo = (e) =>{
        console.log("dateclick" , e);
    } 
    return (
        <div className = {styled.calendarContainer}>
            <FullCalendar
                initialView="dayGridMonth" 
                plugins={[ dayGridPlugin , interactionPlugin ]}
                timeZone = 'Asia/Seoul'
                events = {event}
                dayMaxEvents = {3}
                eventClick = {handleEventClick}
                eventMouseEnter = {handleEventEnter}
            />
            
            {openModal && <CalendarModal closeModal={setOpenModal} title = {content.title} content = {content} pageXY = {pageXY}/>}
        </div>
    )

}

export default MyCalendar;