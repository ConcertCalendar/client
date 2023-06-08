import { useState } from "react";
import DetailModal from "./DetailModal";
import styled from './CalendarDetailTag.module.scss';

const CalendarDetailTag = () => {
    const [visible , setVisible] = useState<Boolean>(false);

    const detailHandler  = (e : React.MouseEvent<HTMLParagraphElement>) => {
        setVisible(!visible)
    }

    return (
        <div className={styled.DetailTagWrap}>
            <h4 onClick={detailHandler}> 상세 </h4>
            {visible&&<DetailModal visible = {visible} setVisible = {setVisible}/>}
        </div>
    )


}

export default CalendarDetailTag;