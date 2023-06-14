import { calendarEvent } from "store/calendarSlice";
import styled from './ConcerList.module.scss';
import Pagination from 'react-js-pagination';
interface ConcertListProps{
    event : Array<calendarEvent>;
}

const ConcertList:React.FC<ConcertListProps> = (props) => {
    const {event} = props;

    const makeList = () => {
        return event.map((item)=>(
            <div className={styled.concertItem}>
                <h1>{item.title}</h1>
                <h4> 날짜 : {item.start == item.end ? item.start : `${item.start} ~ ${item.end}`}</h4>
                <h4> 시간 : {item.conTime} </h4>
                <h4> 장소 : {item.place}</h4>
                <h4> 가격 : {item.maxPrice == item.minPrice ? item.maxPrice : `${item.minPrice} ~ ${item.maxPrice}`}</h4>
            </div>
        ))
    }

    const handlePage = () => {

    }

    return (
        <section className = {styled.concertListContainer}>
            {makeList()}
            <Pagination
                 itemsCountPerPage={10}
                 totalItemsCount={event.length}
                 onClick = {handlePage}
            />
        </section>
    )
}

export default ConcertList;