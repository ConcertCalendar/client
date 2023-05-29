import { axiosInstance } from "utils/customAxios";

interface commentDelete{
    childern ?: React.ReactNode;
    className ?: string;
    url : string;
} 

const CommentDelete:React.FC<commentDelete> = (props) => {
    const {url , className} = props;

    const commentDeletehandler = () => {
        if(confirm('댓글을 삭제하시겠습니까?')){
            axiosInstance.delete(url).then((res)=>{
                alert('댓글이 삭제되었습니다.');
                return;
            }).catch((err)=>{
                alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.')
            })
            
        }
    }

    return (
        <p onClick={commentDeletehandler} className = {className}>
            삭제
        </p>
    )
}
export default CommentDelete;