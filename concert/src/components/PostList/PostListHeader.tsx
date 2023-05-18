import styled from './PostListHeader.module.scss'
interface PostListHeaderProps{
    childern ?: React.ReactNode;
}

const PostListHeader:React.FC<PostListHeaderProps> = (props) => {
    return (
        <ul className = {styled.postListHeader}>
            <li className= {styled.no}> 번호 </li>
            <li className= {styled.title}> 제목 </li>
            <li className= {styled.writer}> 글쓴이 </li>
            <li className= {styled.date}> 날짜 </li>
        </ul>
    )
}

export default PostListHeader;