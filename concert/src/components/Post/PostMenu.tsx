import styled from './PostMenu.module.scss'
interface postMenuProps {
    childern ?: React.ReactNode;
    visible : boolean;
}

const PostMenu:React.FC<postMenuProps> = (props) => {
    const {visible} = props;
    

    return (
        <div className= {styled.postMenuWrap}>
            {visible&& <p>수정</p>}
            {visible&& <p>삭제</p>}            
        </div>

    )
} 

export default PostMenu;