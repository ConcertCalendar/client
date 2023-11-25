import styled from './BoardExp.module.scss';

/* 게시판에 대한 설명을 나타내는 컴포넌트*/
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