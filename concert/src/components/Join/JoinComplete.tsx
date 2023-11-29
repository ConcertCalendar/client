import { useNavigate } from 'react-router-dom';
import styled from './JoinComplete.module.scss';
interface JoinCompleteProps {
    childern ?: React.ReactNode;
}

const JoinComplete:React.FC<JoinCompleteProps> = (props) => {
    const navigate = useNavigate();
    
    const onClickLogin = (event : React.MouseEvent<HTMLButtonElement>) => {
        navigate('/login');
    }

    return (
        <section className = {styled.section_join_complete_slide}>
            완료
            <button 
             onClick={onClickLogin}
             className = {styled.btn_join} 
             type='button'>
                로그인
            </button>  
        </section>
    )

}

export default JoinComplete;