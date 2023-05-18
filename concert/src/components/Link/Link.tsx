import LinkImage from '../../assets/link.jpg'
import styled from './Link.module.scss';
interface LinkProps {
    childern ?: React.ReactNode;
}

const Link:React.FC<LinkProps> = (props) => {
    return (
        <div>
            <img className = {styled.linkImg} src = {LinkImage} alt = "공유하기"/>
        </div>
    )
}

export default Link;