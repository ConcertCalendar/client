import { useState } from 'react';
import styled from './JoinEmail.module.scss';
import { axiosInstance } from 'utils/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setEmail, setPhase } from 'store/joinSlice';

interface JoinEmailProps {
    childern ?: React.ReactNode;

}

const JoinEmail:React.FC<JoinEmailProps> = (props) => {
    const email = useSelector((state:RootState) => state.join.email);//이메일 인풋
    const [checkAuthBtn, setCheckAuthBtn] = useState<boolean>(false); //인증 버튼 활성화 비활성화
    const [sendAuth , setSendAuth] = useState<boolean>(false);//요청 버튼 누른 여부 
    const [emailErrmsg , setEmailErrmsg] = useState<string>(""); //이메일 에러 메세지 내용
    const [certValue , setCertValue] = useState<string>(""); //내가 입력한 인증 번호
    const [authValue , setAuthValue] = useState<string>(""); //서버에서 보낸 인증 번호
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(false); //다음 버튼 활성화 여부
    const [checkAuthInput ,setCheckAuthInput] = useState<boolean>(false); //인증번호 인풋 활성화 여부
    const [displayErrmsg ,setDisplayErrmsg] = useState<boolean>(false); //에러메시지 보낼 건지
    const [slide , setSlide] = useState<boolean>(false); //애니메이션 여부
    const [inputDisabled , setInputDisabled] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => { //이메일 input 받는 함수
        const inputEmail = event.target.value;
        dispatch(setEmail(inputEmail));
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if(regex.test(inputEmail)){ //형식은 맞음
            checkDuplEmail(inputEmail);
            return;
       }
        setEmailErrmsg("이메일을 확인해주세요.")//형식도 틀림
        setCheckNextBtn(false);
        setDisplayErrmsg(true);
    }
    
    const onChangeCert = (event : React.ChangeEvent<HTMLInputElement>) => { //인증번호 input 받는 함수
        setCertValue(event.target.value);
    }
    const checkCertValue = (event : React.FocusEvent<HTMLInputElement>) => { //focus를 잃었을 때 
        if(authValue === certValue){ //인증이 일치하면
            setCheckNextBtn(true); //다음 버튼 활성화
            return
        }
        setCheckNextBtn(false);
    }

    const checkDuplEmail = async(inputEmail : string) => { //이메일 중복 체크
        await axiosInstance.get(`/users/join/emailCheck?email=${inputEmail}`)
        .then((res)=>{
            if(!res.data.data){ //이미 존재하는 이메일이면
                setEmailErrmsg(res.data.message) //이메일 에러 메시지 저장
                setCheckAuthBtn(false);
                setDisplayErrmsg(true);
                return
            }
            setCheckAuthBtn(true); //사용 가능한 이메일이면
            setDisplayErrmsg(false);

        }).catch((err)=> {
            console.log(err);
        })
   } 
   
   async function handleCertificate(event:React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault(); //페이지 리로드 방지
        setInputDisabled(true); //이메일 변경을 막기 위해 disabled
        setSendAuth(true); //버튼 누른걸 체크 후 이메일 변경 버튼으로 변경
        await axiosInstance.get(`/users/join/confirm-mail?email=${email}`)// 인증 메일 발송
        .then((res)=> {
            setAuthValue(res.data.data);
            setCheckAuthInput(true);
        }).catch((err)=> {
           alert("다시 시도해주세요.")
        })
   }
   

    const onClickChagneEmail = (event:React.MouseEvent<HTMLButtonElement>) => { //이메일 변경 버튼 클릭
        setInputDisabled(false); //input 입력 가능
        setSendAuth(false); //인증 버튼으로 변경
        setCheckAuthBtn(false); //인증 버튼 누른 여부 변경
    }

    const handleNext = () => { 
        setSlide(true);
        setTimeout(()=> dispatch(setPhase('1')), 100);
    }

    return ( 
        <section className = {slide ? styled.joinEmailSlide: styled.joinEmail}>
            <h4 >로그인에 사용할 이메일을 입력해주세요</h4>
            
            <input
                type = "email" 
                className = {styled.joinEmailInput}
                onChange = {onChangeEmail}
                placeholder ='이메일 입력'
                autoComplete = "off"
                disabled = {inputDisabled}
            />
            <h5 className = { displayErrmsg ? styled.visible: styled.hidden }>{emailErrmsg}</h5>
            
            <button className = {checkAuthBtn ? styled.joinBtn : styled.joinBtnDisabled}
            type='button' disabled = {!checkAuthBtn} onClick={sendAuth ? onClickChagneEmail : handleCertificate}>
            {sendAuth ? "이메일 변경 ": "인증" }
            </button>
            
            <input
              type = "password"
              className = {styled.joinInput} 
              onChange = {onChangeCert} 
              onBlur = {checkCertValue}
              placeholder = '인증번호 입력'
              autoComplete = 'new-password'
              disabled = {!checkAuthInput}/>

            <button className = {checkNextBtn ? styled.joinBtn : styled.joinBtnDisabled}
            type='button' disabled = {!checkNextBtn} onClick = {handleNext}>
            다음
            </button>  
        </section>
    )
}

export default JoinEmail;


/* 
     {displayCert&&
            <input
              type = "password"
              className = {styled.joinInput} 
              onChange = {onChangeCert} 
              onBlur = {checkCertValue}
              placeholder = '인증번호 입력'/>}

    {!displayNextBtn &&<button className = {checkAuthBtn ? styled.joinBtn : styled.joinBtnDisabled}
            type='button' disabled = {!checkAuthBtn} onClick={handleCertificate}>
            인증
            </button>}
            
    {displayNextBtn &&<button className = {checkNextBtn ? styled.joinBtn : styled.joinBtnDisabled}
    type='button' disabled = {!checkNextBtn}>
    다음
    </button>}        
*/