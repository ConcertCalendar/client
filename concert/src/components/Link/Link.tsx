import { useRef } from 'react';
import LinkImage from '../../assets/link.jpg'
import styled from './Link.module.scss';
interface LinkProps {
    childern ?: React.ReactNode;
    address : string
}

const Link:React.FC<LinkProps> = (props) => {
    const {address} = props;
    const divref = useRef<HTMLDivElement>(null);

    const onClickLinkHandler = () => {
        navigator.clipboard.writeText(address);
        if(divref.current){
            divref.current.style.animation = `${styled.popUp} 1.5s`;
        }   
    }

    const onEndAnimation = () => {
        if(divref.current){
            divref.current.style.animation = 'none';
        }   
    }

    return (
        <div className = {styled.linkWrap}onClick={onClickLinkHandler}>
            <img className = {styled.linkImg} src = {LinkImage} alt = "공유하기"/>
            <div className = {styled.linkmsg} onAnimationEnd={onEndAnimation} ref = {divref}>링크가 복사되었습니다.</div>
        </div>
    )
}

export default Link;