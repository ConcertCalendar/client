import notiImg from '../../assets/off_notifi.jpg'
import styled from './Notification.module.scss'
interface Notification { 
    childern ?: React.ReactNode;
}

const Notification:React.FC<Notification> = (props) => {
    return (
        <div>
            <img className = {styled.notiImg} src = {notiImg} alt = "알림설정"/>
        </div>
    )
}

export default Notification;