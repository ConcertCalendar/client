import styled from './HomeCalendarModal.module.scss'
import { useEffect , useRef , useState  } from 'react';
import { axiosInstance } from 'utils/customAxios';
import { getUserId, isAuth } from 'utils/JwtUtils';
import { useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HomeCalendarModal = ({className , closeModal, title , content , position }) => {
    const modalRef = useRef();
    const [bookmarkState, setBookmarkState] = useState(false);
    const accessToken = useSelector((state)=> state.auth.accessToken);

    const createBookmark = async() => {
        const response = await axiosInstance.post(`/calendar/bookmark/${content.id}`)
        if(response.status === 200){
            setBookmarkState(true);
        }
    }

    const deleteBookmark = async() => {
        const response = await axiosInstance.delete(`/calendar/bookmark/${content.id}`)
        if(response.status === 200){
            setBookmarkState(false);
        }
    }

    const clickBookmarkHandler = async() => {
        if(!isAuth(accessToken)){ //로그인이 안 되어 있으면
            alert("로그인이 필요합니다.")
            return;
        }
   //     bookmarkState ? deleteBookmark() : createBookmark();
    }

    const handleMouseDown = (e) => {
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
        accessToken && setBookmarkState(content.userIdList.includes(getUserId(accessToken)))
        document.addEventListener('mousedown' , handleMouseDown);
        return ()=> { 
            document.removeEventListener('mousedown' , handleMouseDown);
        }
    }, [modalRef])





    return (
        <div className = {styled.modalContainer} ref = {modalRef}>
            <header className = {styled.modalHeader}> 
                <h1 className = {styled.modalTitle}> {title} </h1>
                {
                    bookmarkState ? <StarIcon className = {styled.markingImg} alt ="bookmark" onClick={clickBookmarkHandler}/> 
                    : <StarBorderIcon className = {styled.markingImg} alt = "bookmark" onClick={clickBookmarkHandler}/>
                }
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
                    <p> 가격 : {content.minPrice === content.maxPrice ? `${content.minPrice}` : `${content.minPrice} ~ ${content.maxPrice}`} </p>          
                    <p> 예매 사이트 : </p>
                    {content.bookingLink.yes24Link && <a href = {content.bookingLink.yes24Link} target = {'_blank'}>YES 24 바로가기</a>}
                    {content.bookingLink.interparkLink && <a href = {content.bookingLink.interparkLink} target = {'_blank'}>인터파크 바로가기</a>}
                </div> 
                <img src={content.img} alt = "Content_poster" className = {styled.modalContentPoster}/>
            </div>
        </div>
    )
}

export default HomeCalendarModal;