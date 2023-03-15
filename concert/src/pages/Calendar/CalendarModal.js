import { useEffect , useRef } from 'react';
import PostModalHeader from '../Home/PostModalHeader';
import './modal.css'
function CalendarModal ({closeModal, title , children}) {
    const modalRef = useRef();
    useEffect ( ()=> {
        document.addEventListener('mousedown' , handleMouseDown);
        return ()=> { 
            console.log("modal 사라짐")
            document.removeEventListener('mousedown' , handleMouseDown);
        }
    }, [])
    
    const bodychange = () => {
        const body = document.getElementById('body');
        body.classList.remove('overflowHidden')
    }
    const onClickXBtn = () =>{
        closeModal(false);
        bodychange()
    }   

    const handleMouseDown = (e) => {
        if (modalRef && !modalRef.current.contains(e.target)) {
            closeModal(false);
            bodychange()
          }
          else {
            closeModal(true);
          }
        //if(e.target.offsetParent === modalRef)
    }


    return (
            <div className="modalContainer" ref = {modalRef}>
                <div className = "modalMenu">
                    <span className="modalTitle" multiline >{title}</span>
                    <img src = "/images/star.png" className = "markingImg" alt = ""/>
                    <button onClick={onClickXBtn} className = "close">X</button>
                </div>
                <div className="modalBody">
                    {children}
                </div>
                <section className="modalFooter">
                    <PostModalHeader imgsrc={'images/review.png'} title = {"공연 후기"} seeMore = {"/boards/1?page=0"}/>
                </section>
            </div> 
    )
}

export default CalendarModal;