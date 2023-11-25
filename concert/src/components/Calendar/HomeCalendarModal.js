import styled from './HomeCalendarModal.module.scss'
import { useEffect , useRef , useState  } from 'react';
import { axiosInstance } from 'utils/customAxios';
import { isAuth } from 'utils/JwtUtils';
import { useSelector } from 'react-redux';
import testImage from '../../assets/AnyConv.com__poster6.webp';
const HomeCalendarModal = ({className , closeModal, title , content , position}) => {
    const modalRef = useRef();
    const [bookmarkState , setBookmarkState] = useState(false);
    const accessToken = useSelector((state)=> state.auth.accessToken);

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
    }

    const handleMouseDown = (e) => {
        console.log(e.target);
        if (e.target == 'html'|| modalRef && !modalRef.current.contains(e.target)) {
            closeModal(false);
          }
          else {
            closeModal(true);
          }
    }

    const setModalPosition = () => { //Modal 위치 설정
        modalRef.current.style.setProperty('bottom',`${position[1]}px`);
        modalRef.current.style.setProperty('left' , `${position[0]}px`);
    }

    useEffect ( ()=> {
        setModalPosition();
        document.addEventListener('mousedown' , handleMouseDown);
        return ()=> { 
            document.removeEventListener('mousedown' , handleMouseDown);
        }
    }, [modalRef])





    return (
        <div className = {styled.modalContainer} ref = {modalRef}>
            <header className = {styled.modalHeader}> 
                <h1 className = {styled.modalTitle}> {title} </h1>
                <img src = "/images/star.png" className = {styled.markingImg} alt = "mark" onClick={clickBookmarkHandler}/>
            </header>
            <div className={styled.modalBody}>
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
                <img src={testImage} alt = "Content_poster" className = {styled.modalContentPoster}/>
            </div>
        </div>
    )
}

export default HomeCalendarModal;