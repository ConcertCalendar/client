import { useEffect , useRef } from 'react';
import './css/modal.css'
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
                <button onClick={onClickXBtn} className = "close">X</button>
                <div className="modalTitle"><h1>{title}</h1></div>
                <div className="modalBody">
                    {children}
                </div>
                <div className="modalFooter"> 공연 후기 게시판</div>
            </div>
    )
}

export default CalendarModal;