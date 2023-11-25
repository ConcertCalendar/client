import { useEffect, useRef, useState  } from 'react';
import styled from './Join.module.scss';
import JoinEmail from 'components/Join/JoinEmail';
import JoinPassword from 'components/Join/JoinPassword';
import JoinDetail from 'components/Join/JoinDetail';
import JoinComplete from 'components/Join/JoinComplete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Link } from 'react-router-dom';
import pushpinLogo from '../../assets/pushpinLogo.svg';

interface JoinTestProps {
    childern ?: React.ReactNode;
}

const Join:React.FC<JoinTestProps> = (props) => {
    const phase = useSelector((state:RootState)=>state.join.phase);
    const progressRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
      
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
                <Link className = {styled.joinLogo} to={'/'}>
                    <img src = {pushpinLogo} alt = "joinLogo"/>
                </Link>
                <div className = {styled.progressBar}>
                    <div className = { `${styled.progressBarInner}`} ref = {progressRef}></div>
                </div>
                {(phase==='0')&&<JoinEmail  />}
                {(phase==='1')&&<JoinPassword />}
                {(phase==='2')&&<JoinDetail/>} 
                {(phase==='3')&&<JoinComplete/>}
            </form>
        </article>
    )
}

export default Join;