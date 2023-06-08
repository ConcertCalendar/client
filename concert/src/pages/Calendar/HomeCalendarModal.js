import { useEffect , useRef , useState  } from 'react';
import styled from './CalendarModal.module.scss'
import { axiosInstance } from 'utils/customAxios';
import { isAuth } from 'utils/JwtUtils';
import { useSelector } from 'react-redux';

function HomeCalendarModal ({closeModal, title , content }) {
    const modalRef = useRef();
  //  const [position, setPosition] = useState("")
    const [bookmarkState , setBookmarkState] = useState(false);
    const accessToken = useSelector((state)=> state.auth.accessToken);
    const currentUid = useSelector((state)=> state.login.currentUid);

  /*  const popUpModalPosition = () => {
        console.log('HomeCalendarModal' ,pageXY)
        if(700 < pageXY[1] && pageXY[1] < 1000){
            modalRef.current.style = `top : ${pageXY[1] - 585 }px; left: ${pageXY[0] - 475}px;`;
            setPosition("top");
        }else  if(1000 <= pageXY[1]){
            modalRef.current.style = `top : ${pageXY[1] - 1035 }px; left: ${pageXY[0] - 475}px;`;
        }
    }*/

    const createBookmark = async() => {
        const response = await axiosInstance.post(`/calendar/bookmark/${content.id}`)
        if(response.status === 200){
            console.log('등록 성공')
        }
    }

    const deleteBookmark = async() => {
        const response = await axiosInstance.delete(`/calendar/bookmark/${content.id}`)
        if(response.status === 200){
            console.log('삭제 성공')
        }
    }

    const checkBookmark = async() => {
        const response = await axiosInstance.get('/users/concerts')
        if(response.status === 200){
            console.log('조회 성공', response)
             
        }
    }

    const clickBookmarkHandler = async() => {

        if(!isAuth(accessToken)){ //로그인이 안 되어 있으면
            alert("로그인이 필요합니다.")
            return;
        }

        checkBookmark();
        /*if(){
            deleteBookmark();
        }else{
            createBookmark();
        }*/
    }

    useEffect ( ()=> {
        document.addEventListener('mousedown' , handleMouseDown);
        return ()=> { 
            document.removeEventListener('mousedown' , handleMouseDown);
        }
    }, [modalRef])

    
    const handleMouseDown = (e) => {
        if (modalRef && !modalRef.current.contains(e.target)) {
            closeModal(false);
          }
          else {
            closeModal(true);
          }
    }



    return (
        <div className = {styled.modalForm} ref = {modalRef}>
            <div className= {/*position === 'top'? styled.modalTopContainer :*/ styled.modalContainer}>
                <div className = {styled.modalTitle}> {title} </div>
                <img src = "/images/star.png" className = {styled.markingImg} alt = "mark" onClick={clickBookmarkHandler}/>
                <div className={styled.modalBody}>
                    <img src={content.img} alt = "Content_poster" className = {styled.modalContentPoster}/>
                    <div className = {styled.modalContent}>
                        <p> 가수 : {content.singer}</p>
                        { content.start === content.end ?
                            <p> {`공연 날짜 : ${content.start}`}</p>
                            :
                            <p>{`공연 날짜 : ${content.start} ~ ${content.end}`}</p>
                        }
                        <p> 공연 시작 시간 : {content.conTime}</p>
                        <p> 장소 : {content.place}</p>          
                        <p> 예매 사이트 : </p>
                    </div> 
                </div>
            </div> 
        </div>
    )
}

export default HomeCalendarModal;