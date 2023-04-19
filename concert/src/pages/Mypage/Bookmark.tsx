import Loading from 'components/loading';
import styled from './Bookmark.module.scss';
import {useState} from 'react';

interface BookmarkProps {
    childern ?: React.ReactNode;
}

const Bookmark:React.FC<BookmarkProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className = {styled.bookmarkContainer}>
            <div className = {styled.title}>
                BOOKMARK <span className = {styled.subtitle}>즐겨찾기 한 공연</span>
            </div>
            { 
                loading ? <>
                </>:
                <div className = {styled.contentBox}> 
                    <Loading className= {styled.loading}/>
                </div>
            }
        </div>
    )
}

export default Bookmark;