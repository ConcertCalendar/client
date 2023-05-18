import styled from './HoverCalendar.module.scss';

const HoverCalendar = () => {
    return (
        <section className = {styled.hoverCalendarContainer}>
            <div className = {styled.hoverCalendarImgFrame}>
                공연 정보 클릭시 ...
            </div>
        </section>
    )
}

export default HoverCalendar;