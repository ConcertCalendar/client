import styled from './ReportModal.module.scss';

interface ReportModalProps {
    childern ?: React.ReactNode;
    visible : boolean;
    setVisible : React.Dispatch<React.SetStateAction<boolean>>;
}
const ReportModal:React.FC<ReportModalProps> = (props) => {
    const {visible , setVisible} = props;
    
    const handleTovisible = () => {
        setVisible(!visible);
    }

    return (
        <section className={styled.reportModalContainer}>
            <header className = {styled.reportTitle}>신고하기</header>
            <p className = {styled.rePortCancle} onClick={handleTovisible}>닫기</p>
            <section className={styled.reportContent}>
                <label htmlFor='report' className={styled.label}>사유선택</label>
                <select id = "report" className={styled.reportDropDown}>
                    <option>스팸홍보/도배글 입니다.</option>
                    <option>음란물 입니다.</option>
                    <option>불법 정보를 포함하고 있습니다.</option>
                    <option>청소년에게 유해한 내용입니다.</option>
                </select>
                <button className={styled.reportButton}>신고하기</button>
                <button className={styled.cancleButton} onClick={handleTovisible}>취소</button>
            </section>
        </section>
    )
}

export default ReportModal;