import Ad from 'components/Ad/Ad';
import styled from './Calendar.module.scss';
import HomeCalendar from 'components/Calendar/HomeCalendar';

interface CalendarProps {
  childern ?: React.ReactNode;
}
const Calendar:React.FC<CalendarProps> = (props) => {
    return (
      <div className = {styled.homeContainer}>
         <Ad/>
         <HomeCalendar/>
      </div>
    )
}
 
export default Calendar;
  