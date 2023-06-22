import { useState } from 'react';
import styled from './JoinTerms.module.scss'
import { useDispatch } from 'react-redux';
import { setPhase } from 'store/joinSlice';
interface JoinTermsProps {
    childern ?: React.ReactNode;
    className ?: string;
}

const JoinTerms:React.FC<JoinTermsProps> = (props) => {
    const { className } = props;

    const dispatch = useDispatch();
    const [slide , setSlide] = useState<boolean>(false);
    const handleNext = () => {
        setSlide(true);
        setTimeout(()=>dispatch(setPhase('1')), 100);
    }

    return ( 
        <section className = {slide ? styled.joinTerms_slide : styled.joinTerms} >
            <div className = {styled.divBox}>
            약관
            </div>    
            <button className = {styled.joinBtn} onClick = {handleNext}  type='button'>
                다음
            </button>
        </section>
    )
}

export default JoinTerms;