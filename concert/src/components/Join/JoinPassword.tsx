import { useState } from 'react';
import styled from './JoinPassword.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setPassword, setPhase } from 'store/joinSlice';
interface JoinPasswordProps {
    childern ?: React.ReactNode;
}

//대소문자 체크 기능 넣기
const JoinPassword:React.FC<JoinPasswordProps> = (props) => {
    const dispatch = useDispatch();

    const [slide , setSlide] = useState<boolean>(false);

    const password = useSelector((state:RootState)=>state.join.password);


    const [checkPassword, setCheckPassword] = useState<string>(""); // 패스워드체크

    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(false); //다음 버튼 활성화 여부

    const [inNumber , setInNumber] = useState<boolean>(false); // 숫자 포함

    const [inUnderAlpha , setInUnderAlpha] = useState<boolean>(false); //소문자 포함

    const [inUpperAlpha, setInUpperAlpha] = useState<boolean>(false); //대문자 포함

    const [inSpecial, setInSpecial] = useState<boolean>(false); //특수문자 포함

    const [inlength, setInlength ] = useState<boolean>(false); //길이

    const containNumber = (value : string) => {
        const regex = /[0-9]/
        setInNumber(regex.test(value));
    }

    const containUnderAlpha = (value : string) => {
        const regex = /[a-z]/
        setInUnderAlpha(regex.test(value));
    }

    
    const containUpperAlpha = (value : string) => {
        const regex = /[A-Z]/
        setInUpperAlpha(regex.test(value));
    }
    
    const containSpecial = (value : string) => {
        const regex = /[`~!@#$%^&*()_+=-]/
        setInSpecial(regex.test(value));
    }
    
    const checkdLength = (value : string) => {
        if(value.length >= 8){
            setInlength(true)
            return
        }
        setInlength(false);
    }

    const checkStandard = (value : string ) => {
        containNumber(value);
        containUnderAlpha(value);
        containUpperAlpha(value);
        containSpecial(value);
        checkdLength(value);
    }
    const onChangePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        checkStandard(value);
        dispatch(setPassword(value));
    }


    const onChangeCheckPassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(event.target.value);
    }
 

    const checkSamePassword = (event : React.FocusEvent<HTMLInputElement>) => {
        if(password === checkPassword && inlength && inSpecial &&inUpperAlpha && inUnderAlpha && inNumber){
            setCheckNextBtn(true);
            return;
        }
        setCheckNextBtn(false);
    }
    const handleNext = () => {
        setSlide(true);
        setTimeout(()=>dispatch(setPhase('2')), 300);
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
                <span className= {inlength ?styled.containItem : styled.formatItem}>8자이상</span>
                <span className =  {inUpperAlpha ?styled.containItem : styled.formatItem}>대문자</span>
                <span className =  {inUnderAlpha ?styled.containItem : styled.formatItem}>소문자</span>
                <span className = {inNumber ?styled.containItem : styled.formatItem}>숫자</span> 
                <span className =  {inSpecial ?styled.containItem : styled.formatItem}>특수문자</span>
            </div>
            <input
              type = "password"
              onChange={onChangeCheckPassword}
              onBlur={checkSamePassword}
              className = {styled.joinInput} 
              placeholder = '비밀번호확인'
              autoComplete = 'new-password'
              />
            {checkPassword !== password && <h5 className={styled.passwordErrMsg}>비밀번호가 일치하지 않습니다.</h5>}
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