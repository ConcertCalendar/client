import { useEffect , useRef } from 'react';
import PostModalHeader from '../Home/PostModalHeader';
import styled from './CalendarModal.module.scss'
function CalendarModal ({closeModal, title , content ,pageXY}) {
    const modalRef = useRef();
    useEffect ( ()=> {
        modalRef.current.style.top = `${pageXY[0]}`
        document.addEventListener('mousedown' , handleMouseDown);
        return ()=> { 
            document.removeEventListener('mousedown' , handleMouseDown);
        }
    }, [])

    const handleMouseDown = (e) => {
        if (modalRef && !modalRef.current.contains(e.target)) {
            closeModal(false);
          }
          else {
            closeModal(true);
          }
        //if(e.target.offsetParent === modalRef)
    }


    return (
        <div className = {styled.modalForm}  ref = {modalRef}>
            <div className= {styled.modalContainer}>
                <div className = {styled.modalTitle}> {title} </div>
                <img src = "/images/star.png" className = {styled.markingImg} alt = "mark"/>
                <div className={styled.modalBody}>
                    <img src={content.img} alt = "Content_poster" className = {styled.modalContentPoster}/>
                    <div className = {styled.modalContent}>
                        <p> 가수 : {content.singer}</p>
                        <p> 공연 기간 : {content.start}  ~ {content.end}</p>
                        <p> 공연 시간 : {content.runtime}</p>
                        <p> 장소 : {content.place}</p>          
                        <div className = {styled.ticketLink}>
                            <a href = {content.ticket}>인터파크 바로가기</a>
                            <a href = {content.ticket}>인터파크 바로가기</a>   
                            <a href = {content.ticket}>인터파크 바로가기</a>
                        </div>
                    </div> 
                </div>
                <section className={styled.modalFooter}>
                    <PostModalHeader imgsrc={'images/review.png'} title = {"공연 후기"} seeMore = {"/boards/1?page=0"}/>
                </section>
            </div> 
        </div>
    )
}

export default CalendarModal;