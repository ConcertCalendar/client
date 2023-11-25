import { changeCalendarDateFormat, changePostDateFormat } from 'utils/dateUtils';
import styled from './SearchConcert.module.scss';
interface SearchConcertProps {
    interparkLink : string;
    yes24Link : string;
    conContent: string;
    conNo: number;
    conPlace : string;
    conTitle : string;
    conTime: string | Date;
    conStart: string ;
    conEnd: string | Date;
    createdDate : string| Date;
    posterUrl : string;
    singer : string;
    updatedDate : null | string | Date;
}


const SearchConcert:React.FC<SearchConcertProps> = (props) => {
    const { interparkLink , yes24Link , conContent , conNo ,conPlace , conTitle , conTime,
    conStart, conEnd, createdDate, posterUrl, singer, updatedDate} = props;
    return (
    <div className = {styled.concertSearchContainer}>
        <div className={styled.img}>
            <img src = {posterUrl} alt = {conTitle} className = {styled.poster}/>
        </div>
        <div className={styled.concertTitle}>{conTitle}</div>
        <div className={styled.singer}>{singer}</div>
        <div className = {styled.place}>장소 : {conPlace}</div>
        <div className = {styled.date}>날짜 : {changePostDateFormat(conStart)}</div>
        <div className = {styled.link}>
            바로가기 :  
            {{yes24Link}&&<a href = {yes24Link} target='_blank'> Yes24 </a>}
            {interparkLink === null ? <> </> : <a href = {interparkLink} target='_blank'> 인터파크 </a>}
        </div>
  
      
    </div>
    )
}

export default SearchConcert;