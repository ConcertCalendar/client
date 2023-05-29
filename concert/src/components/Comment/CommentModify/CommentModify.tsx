import { axiosInstance } from "utils/customAxios";

interface CommentModify{
    childern ?: React.ReactNode;
    className ?: string;
} 

const CommentModify:React.FC<CommentModify> = (props) => {
    const {className} = props;

 

    return (
        <p className = {className}>
            수정
        </p>
    )
}
export default CommentModify;