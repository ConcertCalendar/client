import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from './Calendar.module.scss';
import { useState , useEffect} from 'react';
import { axiosInstance } from 'utils/customAxios';
import CalendarCategory from './CalendarCategory/CalendarCategory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { calendarEvent, setEvent, setFilterEvent } from 'store/calendarSlice';
import CalendarTag from './CalendarCategory/CalendarTag/CalendarTag';
import ConcertList from 'components/concerList/ConcertList';
//import Search from 'components/Search/Search';


const CalendarTest = () => {
    const event = useSelector((state:RootState)=> state.calendar.event);
    const filterEvent = useSelector((state:RootState)=> state.calendar.filterEvent);
    const filter = useSelector((state:RootState)=> state.calendar.filter);
    const viewList = useSelector((state:RootState)=> state.calendar.viewList);

    const dispatch = useDispatch();

    const changeProperty = (data : any) => {
        let chagne_data = data.map((item : any)=> {
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
            console.log(res.data.data)
            const events = changeProperty(res.data.data);
            dispatch(setEvent(events));
            dispatch(setFilterEvent(filterEvent));
            console.log(events);
        })
        .catch((err)=> console.log(err));
    }, [] );

    return (
        <section className={styled.CalendarContainer}>
      
            <CalendarTag/>
            {!viewList&&
           
                <FullCalendar
                    headerToolbar = {{start:'title prev,next',end : ''}}
                    initialView="dayGridMonth" 
                    plugins={[ dayGridPlugin , interactionPlugin ]}
                    timeZone = 'Asia/Seoul'
                    events = {filter ? filterEvent : event}
                    dayMaxEvents = {3}
                    locale={'ko'}
                    height= {700}
                    firstDay={1}
                />
   
            }
            {viewList && <ConcertList event={filter ? filterEvent : event}/>}
        </section>
    )
}

export default CalendarTest;