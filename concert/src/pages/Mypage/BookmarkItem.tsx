import styled from './BookmarkItem.module.scss';

interface BookmarkItemProps {
    childern ?: React.ReactNode;
    yes24Link : string | null;
    interparkLink : string | null;
    conContent : string;
    conNo : number;
    conPlace : string;
    conTitle : string;
    conTime : Date| string;
    conStart : Date | string;
    conEnd : Date | string;
    createdDate :  Date | string;
    posterUrl : string;
    singer : string;
    updatedDate : null | Date | string;
    No: number;
}

const BookmarkItem:React.FC<BookmarkItemProps> = (props) => {
    const {yes24Link , interparkLink, conContent, conNo , conPlace
    ,conTitle, conTime, conStart, conEnd, createdDate, posterUrl, singer, updatedDate , No} = props;
    return (
        <div className = {styled.bookMarkItemContainer}>
            <div className = {styled.title}>
                {No}. {conTitle}
            </div>
        
        </div>
    )
}

export default BookmarkItem;