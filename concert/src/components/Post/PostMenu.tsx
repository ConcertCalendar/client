import Report from 'components/Report/Report';
import styled from './PostMenu.module.scss'
interface postMenuProps {
    childern ?: React.ReactNode;
    visible : boolean;
}

const PostMenu:React.FC<postMenuProps> = (props) => {
    const {visible} = props;
    

    return (
        <div className= {styled.postMenuWrap}>
            {visible&& <p className={styled.postMenuItem}>수정</p>}
            {visible&& <p className={styled.postMenuItem}>삭제</p>} 
            <Report className = {styled.postMenuItem}/>
        </div>

    )
} 

export default PostMenu;