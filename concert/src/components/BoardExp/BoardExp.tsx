import styled from './BoardExp.module.scss';

interface boardExpProps {
    childern ?: React.ReactNode;
    explanation ?: string;
}


const BoardExp:React.FC<boardExpProps> = (props) => {
    const {explanation} = props;
    return (
        <section className = {styled.boardExpWrap}>
            <p className= {styled.explanation}>{explanation}</p>
        </section>

    )
}


export default BoardExp;