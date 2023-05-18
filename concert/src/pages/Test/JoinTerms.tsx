import { useState } from 'react';
import styled from './JoinTerms.module.scss'
interface JoinTermsProps {
    childern ?: React.ReactNode;
    className ?: string;
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;

}

const JoinTerms:React.FC<JoinTermsProps> = (props) => {
    const {phase , setPhase , className } = props;
    const [slide , setSlide] = useState<boolean>(false);
    const handleNext = () => {
        setSlide(true);
        setTimeout(()=>setPhase('1'), 100);
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