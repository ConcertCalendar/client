import styled from './JoinDetail.module.scss';
import {useState} from 'react';
interface JoinDetailProps {
    childern ?: React.ReactNode;
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;


}

const JoinDetail:React.FC<JoinDetailProps> = (props) => {
    const {phase , setPhase } = props;
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(true); //다음 버튼 활성화 여부
    const [slide , setSlide] = useState<boolean>(false);

    const handleNext = () => {
        setSlide(true);
        setTimeout(()=>setPhase('4'), 500);
    }

    return (
        <section className = {slide ? styled.JoinDetailSlide : styled.JoinDetail} >
            <label className = {styled.joinLabel}> 닉네임
              <input
                type = "text" 
                placeholder ='닉네임'
                className = {styled.joinInput} 
                autoComplete = "off"
                />
            </label>
            <label className = {styled.joinLabel}> 이름
              <input
                type = "text" 
                placeholder ='이름'
                className = {styled.joinInput} 
                autoComplete = "off"
            />
            </label>
            <label className = {styled.joinLabel}> 생년월일
              <input
                type = "text" 
                placeholder ='생년월일'
                className = {styled.joinInput} 
                autoComplete = "off"
            />
            </label>
            <label className = {styled.joinLabel}> 성별
                <br></br>
                남성 <input type="radio" name="gender" value="male" checked />
                여성 <input type="radio" name="gender" value="female" />
            </label>

            <button 
            className = {checkNextBtn ? styled.joinBtn : styled.joinBtnDisabled}
            disabled = {!checkNextBtn}
            onClick ={handleNext}
            type='button'>
            다음
            </button>  
        </section>
    )

}

export default JoinDetail;