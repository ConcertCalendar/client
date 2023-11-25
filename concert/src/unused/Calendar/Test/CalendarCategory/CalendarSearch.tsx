import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEvent } from "store/calendarSlice";
import { axiosInstance } from "utils/customAxios";
interface CalendarSearch {
    childern ?: React.ReactNode;
}

const CalendarSearch:React.FC<CalendarSearch> = () => {
    const [search , setSearch] = useState<string>("");
    const dispatch = useDispatch();

    const changeProperty = (data : any) => {
        let chagne_data = data.map((item : any)=> {
            let obj = {
                id : item.conNo,
                title : item.conTitle,
                start : item.concertTime.conStart,
                end : item.concertTime.conEnd,
                conTime : item.concertTime.conTime,
            //    runtime : item.time,
                singer : item.singer,
                place : item.conPlace,
                img : item.posterUrl,
              //  userIdList : item.userIdList,
            }
            return obj;

        })
        return chagne_data;
    }

    const onSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    } 

    const loseFocus = () => {
        axiosInstance.get(`calendar/searchEvent?searchKeyword=${search}`)
        .then((res)=> {
            console.log(res)
            const events = changeProperty(res.data.data);
            console.log(events)
            dispatch(setEvent(events));    
        })
    }

    return (
        <div>
            <label htmlFor="CalendarSearch" >검색</label>
            <input id = "CaledarSearch" onBlur={loseFocus} onChange={onSearchChange}/>
        </div>
    )
}

export default CalendarSearch;