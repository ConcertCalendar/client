import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction"
import dayGridPlugin from '@fullcalendar/daygrid';
import { StyleWrapper } from '../HomeCalendar';
import styled from './Calendar.module.scss';
import { useState , useEffect} from 'react';
import { axiosInstance } from 'utils/customAxios';
import CalendarCategory from './CalendarCategory/CalendarCategory';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { calendarEvent, setEvent, setFilterEvent } from 'store/calendarSlice';
import CalendarTag from './CalendarCategory/CalendarTag/CalendarTag';


const CalendarTest = () => {
    const event = useSelector((state:RootState)=> state.calendar.event);
    const filterEvent = useSelector((state:RootState)=> state.calendar.filterEvent);
    const filter = useSelector((state:RootState)=> state.calendar.filter);


    const dispatch = useDispatch();

    const changeProperty = (data : any) => {
        let chagne_data = data.map((item : any)=> {
            let obj = {
                id : item.conNo,
                title : item.conTitle,
                start : item.concertTime.conStart,
                end : item.concertTime.conEnd,
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
            <StyleWrapper>
                <FullCalendar
                    headerToolbar = {{start:'title prev,next',end : ''}}
                    initialView="dayGridMonth" 
                    plugins={[ dayGridPlugin , interactionPlugin ]}
                    timeZone = 'Asia/Seoul'
                    events = {filter ? filterEvent : event}
                    dayMaxEvents = {3}
                    locale={'ko'}
                    height= {700}
                />
            </StyleWrapper>
        </section>
    )
}

export default CalendarTest;