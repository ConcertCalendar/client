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
}

const BookmarkItem:React.FC<BookmarkItemProps> = (props) => {
    const {yes24Link , interparkLink, conContent, conNo , conPlace
    ,conTitle, conTime, conStart, conEnd, createdDate, posterUrl, singer, updatedDate} = props;
    return (
        <div >
        
        
        </div>
    )
}

export default BookmarkItem;