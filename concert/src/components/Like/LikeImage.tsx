import styled from'./LikeImage.module.scss';
import likeImg from '../../assets/AnyConv.com__like.webp'
import fillImg from '../../assets/AnyConv.com__fillheart.webp'
import {useRef} from 'react';

interface LikeImageProps {
    childern?: React.ReactNode;
    className ?: string;
    size ?: string;
    fill : boolean;
    number ?: number;
    beat ?: boolean; 
}



const LikeImage : React.FC<LikeImageProps> = (props) => {
    const {number, className = '' , size ,  fill , beat } = props;
    const beatRef = useRef<HTMLImageElement>(null); 
    
    return (
        <div className = {className} >
            <img 
             className = {size === 'small' ? styled.smallImg : styled.Img}
             src = {fill ? fillImg : likeImg}
             alt = "like"
             ref = {beatRef} />
            {number}
        </div>
    )
}

export default LikeImage;