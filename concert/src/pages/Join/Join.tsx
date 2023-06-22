import { useEffect, useRef, useState } from 'react';
import styled from './Join.module.scss';
import JoinTerms from 'components/Join/JoinTerms';
import JoinEmail from 'components/Join/JoinEmail';
import JoinPassword from 'components/Join/JoinPassword';
import JoinDetail from 'components/Join/JoinDetail';
import JoinComplete from 'components/Join/JoinComplete';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface JoinTestProps {
    childern ?: React.ReactNode;
}

const Join:React.FC<JoinTestProps> = (props) => {
    const phase = useSelector((state:RootState)=>state.join.phase);
    const progressRef = useRef<HTMLDivElement>(null);
    useEffect(()=> {
        switch(phase){
            case '1' : {
                progressRef.current?.classList.add(`${styled.phase1}`)
                return
            }
            case '2' :{
                progressRef.current?.classList.remove(`${styled.phase1}`);
                progressRef.current?.classList.add(`${styled.phase2}`);
                return
            }case '3':{
                progressRef.current?.classList.remove(`${styled.phase2}`);
                progressRef.current?.classList.add(`${styled.phase3}`);
                return
            }case '4':{
                progressRef.current?.classList.remove(`${styled.phase3}`);
                progressRef.current?.classList.add(`${styled.phase4}`);
                return
            }
            default: {
                return
            }
        }
     
    }, [phase])
    return ( 
        <article className = {styled.joinContainer}>
            <form className = {styled.joinForm}>
                <h2 className = {styled.joinMsg}>회원 가입 메세지</h2>
                <div className = {styled.progressBar}>
                    <div className = { `${styled.progressBarInner}`} ref = {progressRef}></div>
                </div>
                {(phase==='0')&&<JoinTerms  />}
                {(phase==='1')&&<JoinEmail  />}
                {(phase==='2')&&<JoinPassword />} 
                {(phase==='3')&&<JoinDetail/>}
                {(phase==='4')&&<JoinComplete/>}
            </form>
        </article>
    )
}

export default Join;
  /* if( phase === '1') {
            progressRef.current?.classList.add(`${styled.phase1}`);
        }else if( phase === '2'){
            progressRef.current?.classList.remove(`${styled.phase1}`);
            progressRef.current?.classList.add(`${styled.phase2}`);
        }else if(phase === '3'){
            progressRef.current?.classList.remove(`${styled.phase2}`);
            progressRef.current?.classList.add(`${styled.phase3}`);
        }else if(phase==='4'){
            progressRef.current?.classList.remove(`${styled.phase3}`);
            progressRef.current?.classList.add(`${styled.phase4}`);
        }*/
    /*const [email , setEmail] = useState<string>("");
    const [checkNextBtn, setCheckNextBtn] = useState<boolean>(false);
    const [displayErrmsg ,setDisplayErrmsg] = useState<boolean>(false);
    const [emailErrmsg , setEmailErrmsg] = useState<string>("");

    const onChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const checkDuplEmail = async() => { //이메일 중복 체크
        await axiosInstance.get(`/users/join/emailCheck?email=${email}`)
        .then((res)=>{
            if(!res.data.data){ //이미 존재하는 이메일이면
                setEmailErrmsg(res.data.message)
                setCheckNextBtn(false);
                setDisplayErrmsg(true);
                return
            }
            setCheckNextBtn(true); //사용 가능한 이메일이면
            setDisplayErrmsg(false);

        }).catch((err)=> {
            console.log(err);
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

    return ( 
        <article className = {styled.joinContainer}>
            <section className = {styled.joinForm}>
                <h2 className = {styled.joinMsg}>회원 가입 메세지</h2>
                <progress value = '20' max = '100' className = {styled.progressbar}></progress>
                <h4 className = {styled.guideMsg}>로그인에 사용할 이메일을 입력해주세요</h4>
                <input
                 type = "email" 
                 className = {styled.joinInput}
                 onChange = {onChangeEmail}
                 onBlur = {onBlurEmail}
                 placeholder ='이메일 입력'
                 />
                 <div className = { displayErrmsg ? styled.visible: styled.hidden }>
                     <h5 className = {styled.emailErrmsg}>{emailErrmsg}</h5>
               </div>
                <button className = {checkNextBtn ? styled.joinBtn : styled.joinBtnDisabled}
                 type='button' disabled = {checkNextBtn}>
                 인증
                 </button>
            </section>
        </article>
    )*/