import { useState } from 'react';
import styled from './JoinEmail.module.scss';
import { axiosInstance } from 'utils/customAxios';

interface JoinEmailProps {
    childern ?: React.ReactNode;
}

const JoinEmail:React.FC<JoinEmailProps> = (props) => {
    const [email , setEmail] = useState<string>("");
    const [checkAuthBtn, setCheckAuthBtn] = useState<boolean>(false);
    const [emailErrmsg , setEmailErrmsg] = useState<string>("");
    const [certValue , setCertValue] = useState<string>("");
    const [authValue , setAuthValue] = useState<string>("");
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(false);

    const [displayNextBtn , setDisplayNextBtn] = useState<boolean>(false);
    const [displayCert , setDisplayCert] = useState<boolean>(false);
    const [displayErrmsg ,setDisplayErrmsg] = useState<boolean>(false);


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
    const ClickNextBtn = () => {

    }

    const checkDuplEmail = async() => { //이메일 중복 체크
        await axiosInstance.get(`/users/join/emailCheck?email=${email}`)
        .then((res)=>{
            if(!res.data.data){ //이미 존재하는 이메일이면
                setEmailErrmsg(res.data.message)
                setDisplayNextBtn(false);
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
            setDisplayCert(true);
            setDisplayNextBtn(true);
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
        setDisplayNextBtn(false);
    }

    return ( 
        <section>
            <progress value = '25' max = '100' className = {styled.progressbar}></progress>
            <h4 className = {styled.guideMsg}>로그인에 사용할 이메일을 입력해주세요</h4>
            <input
                type = "email" 
                className = {styled.joinEmailInput}
                onChange = {onChangeEmail}
                onBlur = {onBlurEmail}
                placeholder ='이메일 입력'
            />
            <h5 className = { displayErrmsg ? styled.visible: styled.hidden }>{emailErrmsg}</h5>
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
        </section>
    )
}

export default JoinEmail;