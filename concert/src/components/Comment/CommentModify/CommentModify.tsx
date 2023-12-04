import { comment } from "../Comment";

interface CommentModify{
    childern ?: React.ReactNode;
    className ?: string;
    setModify : React.Dispatch<React.SetStateAction<boolean>>;
    clicked : boolean;
    comment : comment;
    boardId : number;
} 

const CommentModify:React.FC<CommentModify> = (props) => {
    const {className , comment , boardId , setModify  , clicked} = props;
    
    const onClickModify = (event : React.MouseEvent<HTMLParagraphElement>) => {
        setModify(!clicked);
    } 
 

    return (
        <p className = {className} onClick={onClickModify}>
            수정
        </p>
    )
}
export default CommentModify;