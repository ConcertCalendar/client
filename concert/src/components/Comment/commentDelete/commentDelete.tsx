import { useDispatch } from "react-redux";
import { deleteComment } from "store/commentSlice";
import { comment } from "../Comment";
import { axiosInstance } from "utils/customAxios";

interface commentDelete{
    childern ?: React.ReactNode;
    className ?: string;
    comment : comment;
    boardId : number;
} 

const CommentDeleteBtn:React.FC<commentDelete> = (props) => {
    const {className , comment , boardId} = props;
    const dispatch = useDispatch();
    const commentDeletehandler = () => {
        if(confirm('댓글을 삭제하시겠습니까?')){
            axiosInstance.delete(`/boards/${boardId}/posts/${comment.postId}/comments/${comment.id}`)
            .then((res)=> {
               dispatch(deleteComment(comment));
            })
            .catch((err) => alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.'))
        }
    }

    return (
        <p onClick={commentDeletehandler} className = {className}>
            삭제
        </p>
    )
}
export default CommentDeleteBtn;