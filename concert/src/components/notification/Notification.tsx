import notiImg from '../../assets/off_notifi.jpg'
import styled from './Notification.module.scss'
interface Notification { 
    childern ?: React.ReactNode;
    visible ?: boolean;
}

const Notification:React.FC<Notification> = (props) => {
    const {visible} = props;
    return (
        <div>
            {visible&&<img className = {styled.notiImg} src = {notiImg} alt = "알림설정"/>}
        </div>
    )
}

export default Notification;