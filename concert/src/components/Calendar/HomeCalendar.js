import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState , useRef } from "react";
import { axiosInstance } from "../../utils/customAxios";
import style from './HomeCalendar.module.scss'
import styled from "@emotion/styled";
import HomeCalendarModal from "./HomeCalendarModal.js";

/* 캘린더를 띄우는 컴포넌트  */

export const StyleWrapper = styled.div`
  .fc-scrollgrid{
    border : 1px #C5C7D0 solid !important;
  }
  .fc-scrollgrid td:last-of-type {
    border-right: none !important;
    border-bottom: none;
  }
  .fc-toolbar-chunk {
    display : flex !important;
  }
  .fc-prev-button {
    font-size : 30px;
    padding : 0px;
    color : #AE3BB6;
    background : transparent;
    border: none !important;
    outline:none !important;
    box-shadow:none !important;
  }
  .fc-prev-button:hover{
    background: transparent !important;
    color : #AE3BB6 !important;
  }

  .fc-next-button {
    font-size : 30px;
    padding : 0px;
    color : #AE3BB6;
    background : transparent;
    border: none !important;
    outline:none !important;
    box-shadow:none !important;
  }
  .fc-next-button:hover{
    color : #AE3BB6 !important;
    background : transparent !important;
  }

  .fc-toolbar-title {
    font-family : ${style.toolbarFont};
    font-size : 32px;
    color : #323338;
    font-weight : normal;
  }

  .fc-daygrid-day-top {
    flex-direction: row !important;
    padding-left : 8px;
}

`

function HomeCalendar() {
    const [event , setEvents] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [content , setContent] = useState({});
    const [position, setPosition ] = useState([]);
    const calendarContainerRef = useRef();


    const handleEventClick = (e) => {
        setModalPosition(e.jsEvent.pageX , e.jsEvent.pageY); // modal이 뜰 위치
        setOpenModal(true) //모달 랜더링 여부
        setModalContent(parseInt(e.event._def.publicId)); //클릭한 이벤트의 id 값을 넘겨 일치하는 데이터를 추출
    }
    
    const setModalContent = (id) => {
      const result = event.filter((el) => el.id === id); //같은 id를 가진 정보를 result에 저장
      console.log(result);
      setContent(result[0]);  //result[0] 즉 id가 일치하는 events를 props의 content로 넘겨주기 위해 저장
    }

    const setModalPosition = (pageX , pageY) => {
        const containerPostion = calendarContainerRef.current.getBoundingClientRect();
        const x = pageX  - containerPostion.x;
        const y = window.scrollY + containerPostion.bottom -pageY  
        setPosition([x,y]);
    }
 
    const changeProperty = (data ) => {
      let chagne_data = data.map((item )=> {
          let obj = {
              id : item.id,
              title : item.title,
              start : item.concertTime.start,
              end : item.concertTime.end, 
              conTime : item.concertTime.conTime,
              singer : item.singer,
              place : item.conPlace,
              img : item.posterUrl,
              type : item.concertType,
              genreList : item.genreList,
              maxPrice : item.maxPrice,
              minPrice : item.minPrice,
              location : item.regionName,
            //  userIdList : item.userIdList,
          }
          return obj;

      })
      return chagne_data;
    }

    useEffect( () => {
        axiosInstance.get('/calendar/event')
        .then((res)=> {
            if(res.status === 200){
                const events = changeProperty(res.data.data);
                setEvents(events);
            }
        })
        .catch((err)=> console.log(err));
    }, [] );
    
    return (
        <div className = {style.calendarContainer} ref = {calendarContainerRef}>
            <StyleWrapper>
              <FullCalendar
                headerToolbar = {{start: '',  center : 'prev title next', end : ''}}
                initialView="dayGridMonth" 
                plugins={[ dayGridPlugin , interactionPlugin ]}
                timeZone = 'Asia/Seoul'
                events = {event}
                dayMaxEvents = {3}
                eventClick = {handleEventClick}
                locale={'ko'}
                height= {920}
              />
            </StyleWrapper>
            {openModal && <HomeCalendarModal position = {position} closeModal={setOpenModal} title = {content.title} content = {content}/>}
        </div>
    )

}

export default HomeCalendar;