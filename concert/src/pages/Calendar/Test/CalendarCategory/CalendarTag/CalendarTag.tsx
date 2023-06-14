import { useEffect } from 'react';
import styled from './CalendarTag.module.scss';
import CalendarTagItem from './CalendarTagItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { calendarEvent, setFilter, setFilterEvent, setList } from 'store/calendarSlice';
import CalendarDetailTag from './DetailTag/CalendarDetailTag';

interface calendarTagProps {
    childern ?: React.ReactNode;
}

const CalendarTag:React.FC<calendarTagProps> = (props) => {
    const event = useSelector((state:RootState)=>state.calendar.event);
    const typeFilterList = useSelector((state:RootState)=> state.calendar.typeFilterList);
    const genreFilterList = useSelector((state:RootState)=> state.calendar.genreFilterList);
    const minPrice = useSelector((state:RootState)=> state.calendar.minPrice);
    const maxPrice = useSelector((state:RootState)=> state.calendar.maxPrice);
    const cLocation = useSelector((state:RootState)=> state.calendar.location);
    const detail = useSelector((state:RootState)=> state.calendar.detail);
    const viewList = useSelector((state:RootState)=>state.calendar.viewList);

    const dispatch = useDispatch();

    const checkFilterEvent = (item : calendarEvent) => {
        if(typeFilterList.length !== 0 && !typeFilterList.includes(item.type)){ //분류 1의 값을 갖고 있지 
            return false; 
        }

        if(cLocation !== "" && item.location !== cLocation){ //장소가 설정되면
            return false;
        }
        if(maxPrice!==0){
            if(minPrice > item.maxPrice || maxPrice < item.minPrice  || (item.maxPrice > maxPrice&& item.minPrice < minPrice))
                return false
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
        if(typeFilterList.length !== 0 || genreFilterList.length !== 0 || detail){
            dispatch(setFilter(true))
            filtering()
        }else{
            dispatch(setFilter(false))
        }   
        console.log(maxPrice, minPrice , cLocation)
    },[typeFilterList, genreFilterList , detail])

    return (
        <section className = {styled.tagContainer}>
                <div className ={styled.viewTag}>
                    <div className={viewList ? styled.calendar : styled.selCalendar} onClick = {()=> {dispatch(setList(false))}}>캘린더로 보기</div>
                    <div className={viewList ? styled.selList : styled.list} onClick = {()=> {dispatch(setList(true))}}>리스트로 보기</div>
                </div>
                <h4>콘서트 타입</h4>    
                <div className = {styled.typeTag}>
                    <CalendarTagItem tagType = '1' tagValue='페스티벌'/>
                    <CalendarTagItem tagType = '1' tagValue='콘서트'/>
                </div>
                <h4>장르</h4>
                <div className = {styled.genreTag}>
                    <CalendarTagItem tagType = '2' tagValue='팝'/>
                    <CalendarTagItem tagType = '2' tagValue='락'/>
                    <CalendarTagItem tagType = '2' tagValue='재즈'/>
                    <CalendarTagItem tagType = '2' tagValue='힙합'/>
                    <CalendarTagItem tagType = '2' tagValue='일레트로닉'/>
                    <CalendarTagItem tagType = '2' tagValue='클래식'/>
                    <CalendarTagItem tagType = '2' tagValue='기타'/>
                </div>
                <div className = {styled.detailTag}>
                    <CalendarDetailTag/>
                </div>
        </section>

    )


}

export default CalendarTag;