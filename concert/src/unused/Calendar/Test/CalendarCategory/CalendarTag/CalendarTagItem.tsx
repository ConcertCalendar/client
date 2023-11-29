import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilterList, deleteFilterList } from "store/calendarSlice";
import { RootState } from "store/store";
import styled from './CalendarTagItem.module.scss';

interface CalendarTagItemProps {
    childern ?: React.ReactNode;
    tagType : string;
    tagValue : string;
}
const CalendarTagItem:React.FC<CalendarTagItemProps> = (props) => {
    const dispatch = useDispatch();
    const [select ,setSelect] = useState<Boolean>(false); 
    const  { tagType ,tagValue} = props;
    
    const tagClickHandler  = (event : React.MouseEvent<HTMLDivElement>) => {
        select ? dispatch(deleteFilterList([tagType , tagValue])) : dispatch(addFilterList([tagType,tagValue]));     
        setSelect(!select);
    }


    return (
        <div className={select ? styled.selectedTagItem : styled.tagItem } onClick = {tagClickHandler}>
            {tagValue}
        </div>
    )
}

export default CalendarTagItem;