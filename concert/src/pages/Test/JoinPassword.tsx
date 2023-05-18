import { useState } from 'react';
import styled from './JoinPassword.module.scss'
interface JoinPasswordProps {
    childern ?: React.ReactNode;
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;

}

//대소문자 체크 기능 넣기

const JoinPassword:React.FC<JoinPasswordProps> = (props) => {
    const {phase , setPhase } = props;
    const [slide , setSlide] = useState<boolean>(false);

    const [password, setPassword] = useState<string>(""); //패스워드 

    const [checkPassword, setCheckPassword] = useState<string>(""); // 패스워드체크

    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(false); //다음 버튼 활성화 여부

    const onChangePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onChangeCheckPassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(event.target.value);
    }

    const checkSamePassword = (event : React.FocusEvent<HTMLInputElement>) => {
        if(password === checkPassword){
            setCheckNextBtn(true);
            return;
        }
        setCheckNextBtn(false);
    }
    const handleNext = () => {
        setSlide(true);
        setTimeout(()=>setPhase('3'), 500);
    }

    return ( 
        <section className = {slide ? styled.JoinPasswordSlide : styled.JoinPassword} >
            <h4>로그인에 사용할 비밀번호를 입력해주세요</h4>
            <input
              onChange = {onChangePassword}
              type = "password"
              className = {styled.joinInput} 
              placeholder = '비밀번호'
              autoComplete = 'new-password'/>
            <div className = {styled.format}>
                <span className = {styled.formatItem}>대문자</span>
                <span className = {styled.formatItem}>소문자</span>
                <span className = {styled.formatItem}>숫자</span> 
                <span className = {styled.formatItem}>특수문자</span>
            </div>
            <input
              type = "password"
              onChange={onChangeCheckPassword}
              onBlur={checkSamePassword}
              className = {styled.joinInput} 
              placeholder = '비밀번호확인'
              autoComplete = 'new-password'
              />
            
            <button 
            className = {checkNextBtn ? styled.joinBtn : styled.joinBtnDisabled}
            disabled = {!checkNextBtn}
            type='button'
            onClick = {handleNext}>
            다음
            </button>  
        </section>
    )
}

export default JoinPassword;