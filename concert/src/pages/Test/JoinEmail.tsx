import { useState } from 'react';
import styled from './JoinEmail.module.scss';
import { axiosInstance } from 'utils/customAxios';

interface JoinEmailProps {
    childern ?: React.ReactNode;
    phase : string;
    setPhase : React.Dispatch<React.SetStateAction<string>>;
}

const JoinEmail:React.FC<JoinEmailProps> = (props) => {
    const  {phase ,setPhase}  = props;

    const [email , setEmail] = useState<string>(""); //이메일 인풋
    const [checkAuthBtn, setCheckAuthBtn] = useState<boolean>(false); //인증 버튼 활성화 비활성화
    const [emailErrmsg , setEmailErrmsg] = useState<string>(""); //이메일 에러 메세지 내용
    const [certValue , setCertValue] = useState<string>(""); //내가 입력한 인증 번호
    const [authValue , setAuthValue] = useState<string>(""); //서버에서 보낸 인증 번호
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(true); //다음 버튼 활성화 여부
    const [checkAuthInput ,setCheckAuthInput] = useState<boolean>(false); //인증번호 인풋 활성화 여부
    const [displayErrmsg ,setDisplayErrmsg] = useState<boolean>(false); //에러메시지 보낼 건지
    const [slide , setSlide] = useState<boolean>(false); //애니메이션 여부

    const onChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    
    const onChangeCert = (event : React.ChangeEvent<HTMLInputElement>) => {
        setCertValue(event.target.value);
    }
    const checkCertValue = (event : React.FocusEvent<HTMLInputElement>) => { //focus를 잃었을 때 
        console.log('a', authValue ,'c' ,certValue)
        if(authValue === certValue){
            setCheckNextBtn(true);
            return
        }
        setCheckNextBtn(false);
    }

    const checkDuplEmail = async() => { //이메일 중복 체크
        await axiosInstance.get(`/users/join/emailCheck?email=${email}`)
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

   const handleCertificate = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        axiosInstance.get(`/users/join/confirm-mail?email=${email}`)
        .then((res)=> {
            setAuthValue(res.data.data);
            setCheckAuthInput(true);
        }).catch((err)=> {
            console.log('인증버튼err' , err)
        })
    }

    const onBlurEmail = async (event : React.FocusEvent<HTMLInputElement>) => { //focus를 잃었을 때 
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if(regex.test(email)){ //형식은 맞음
            checkDuplEmail();
            return;
       }
        setEmailErrmsg("이메일을 확인해주세요.")//형식도 틀림
        setCheckNextBtn(false);
        setDisplayErrmsg(true);
    }

    const handleNext = () => {
        setSlide(true);
        setTimeout(()=> setPhase('2'), 300);
    }

    return ( 
        <section className = {slide ? styled.joinEmailSlide: styled.joinEmail}>
            <h4 >로그인에 사용할 이메일을 입력해주세요</h4>
            
            <input
                type = "email" 
                className = {styled.joinEmailInput}
                onChange = {onChangeEmail}
                onBlur = {onBlurEmail}
                placeholder ='이메일 입력'
                autoComplete = "off"
            />
            <h5 className = { displayErrmsg ? styled.visible: styled.hidden }>{emailErrmsg}</h5>
            
            <button className = {checkAuthBtn ? styled.joinBtn : styled.joinBtnDisabled}
            type='button' disabled = {!checkAuthBtn} onClick={handleCertificate}>
            인증
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