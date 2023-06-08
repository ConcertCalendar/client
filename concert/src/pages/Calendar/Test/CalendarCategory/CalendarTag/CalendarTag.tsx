import { useEffect } from 'react';
import styled from './CalendarTag.module.scss';
import CalendarTagItem from './CalendarTagItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { calendarEvent, setFilter, setFilterEvent } from 'store/calendarSlice';
import CalendarDetailTag from './DetailTag/CalendarDetailTag';

interface calendarTagProps {
    childern ?: React.ReactNode;
}

const CalendarTag:React.FC<calendarTagProps> = (props) => {
    const event = useSelector((state:RootState)=>state.calendar.event);
    const typeFilterList = useSelector((state:RootState)=> state.calendar.typeFilterList);
    const genreFilterList = useSelector((state:RootState)=> state.calendar.genreFilterList);
    const filterEvent = useSelector((state:RootState)=> state.calendar.filterEvent);
    const filter = useSelector((state:RootState)=> state.calendar.filter);
    const dispatch = useDispatch();

    const checkFilterEvent = (item : calendarEvent) => {
        if(typeFilterList.length !== 0 && !typeFilterList.includes(item.type)){ //분류 1의 값을 갖고 있지 않으면
            return false; 
        }
        for(let i = 0 ; i < genreFilterList.length ; i++){ //분류 1의 값을 갖고 있거나 분류 1의 length 가 0일 때
            if(!item.genreList.includes(genreFilterList[i])){ //분류 2의 값을 갖고 있지 않으면
                return false
            }
            return true;
        }
        return true;
    }   
    
    const filtering = () => {
        const temp = event.filter(item=> checkFilterEvent(item))
        dispatch(setFilterEvent(temp));
    }

    useEffect(()=>{
        if(typeFilterList.length !== 0 || genreFilterList.length !== 0){
            dispatch(setFilter(true))
            filtering()
      
        }else{
            dispatch(setFilter(false))
        }   
    },[typeFilterList, genreFilterList])

    return (
        <section className = {styled.tagContainer}>
                <h4>콘서트 타입</h4>    
                <div className = {styled.typeTag}>
                    <CalendarTagItem tagType = '1' tagValue='페스티벌'/>
                    <CalendarTagItem tagType = '1' tagValue='콘서트'/>
                    <CalendarTagItem tagType = '1' tagValue='뮤지컬'/>
                    <CalendarTagItem tagType = '1' tagValue='클래식'/>
                </div>
                <h4>장르</h4>
                <div className = {styled.genreTag}>
                    <CalendarTagItem tagType = '2' tagValue='팝'/>
                    <CalendarTagItem tagType = '2' tagValue='락'/>
                    <CalendarTagItem tagType = '2' tagValue='재즈'/>
                    <CalendarTagItem tagType = '2' tagValue='힙합'/>
                    <CalendarTagItem tagType = '2' tagValue='일레트로닉'/>
                    <CalendarTagItem tagType = '2' tagValue='기타'/>
                </div>
                <div className = {styled.detailTag}>
                    <CalendarDetailTag/>
                </div>
        </section>

    )


}

export default CalendarTag;