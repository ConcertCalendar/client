import { useState } from "react";
import ReportModal from "./ReportModal";

interface ReportProps { 
    childern ?: React.ReactNode;
    className : string;
}
const Report:React.FC<ReportProps> = (props) => {
    const {className}  = props;
    const [visible , setVisible] = useState<boolean>(false);

    const handleToModal = () => {
        setVisible(!visible);
    }

    return (
        <div className={className}>
            <p onClick = {handleToModal}>신고</p>
            {visible&&<ReportModal visible = {visible} setVisible = {setVisible}></ReportModal>}
        </div>
    
    )

}

export default Report;