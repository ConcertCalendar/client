import MarkImg from '../../assets/AnyConv.com__free-icon-star-4369505.webp'
import styled from './Mark.module.scss'
interface Mark { 
    childern ?: React.ReactNode;
}

const Mark:React.FC<Mark> = (props) => {
    const markClickHandelr = () => {


    }
    
    return (
        <div onClick = {markClickHandelr}>
            <img className = {styled.markImg} src = {MarkImg} alt = "북마크"/>
        </div>
    )
}

export default Mark;