import styled from './JoinComplete.module.scss';
import {useState} from 'react';
interface JoinCompleteProps {


}

const JoinComplete:React.FC<JoinCompleteProps> = (props) => {
    const [checkNextBtn ,setCheckNextBtn] = useState<boolean>(false); //다음 버튼 활성화 여부
    return (
        <section className = {styled.JoinComplete}>
            완료
            <button 
            className = {styled.joinBtn} 
            type='button'>
            로그인
            </button>  
        </section>
    )

}

export default JoinComplete;