import styled from './JoinEmail.module.scss'
interface JoinTermsProps {
    childern ?: React.ReactNode;
    phase : string
    setPhase : React.Dispatch<React.SetStateAction<string>>
}

const JoinTerms:React.FC<JoinTermsProps> = (props) => {
    const {phase , setPhase} = props;

    const handleNext = () => {
        setPhase('1');
    }

    return ( 
        <section>
            <progress value = '0' max = '100' className = {styled.progressbar}></progress>
            <button className = {styled.joinBtn} onClick = {handleNext}type='button'>
            다음
            </button>
        </section>
    )
}

export default JoinTerms;