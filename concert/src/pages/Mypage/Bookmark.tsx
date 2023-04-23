import Loading from 'components/loading';
import styled from './Bookmark.module.scss';
import {useEffect, useState} from 'react';
import { axiosInstance } from 'utils/customAxios';
import BookmarkItem from './BookmarkItem';

interface BookmarkProps {
    childern ?: React.ReactNode;
}

interface BookmarkItem {
    childern ?: React.ReactNode;
    bookingLink : bookingLink;
    conContent : string;
    conNo : number;
    conPlace : string;
    conTitle : string;
    concertTime : concertTime;
    createdDate :  Date | string;
    posterUrl : string;
    singer : string;
    updatedDate : null | Date | string;
}

interface bookingLink {
    yes24Link : string | null;
    interparkLink : string | null;
}

interface concertTime {
    conTime : Date| string;
    conStart : Date | string;
    conEnd : Date | string;
}
const Bookmark:React.FC<BookmarkProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [bookmarkData , setBookmarkData] = useState<Array<BookmarkItem>>([]);


    useEffect(()=> {
        const getBookmark = async() => {
            const response = await axiosInstance.get('users/concerts')
            if(response.status === 200) {
                setBookmarkData(response.data.data);  
                setLoading(true);            
            }
        }

        getBookmark();
    } , [loading])
    return (
        <div className = {styled.bookmarkContainer}>
            <div className = {styled.title}>
                BOOKMARK <span className = {styled.subtitle}>즐겨찾기 한 공연</span>
            </div>
            { 
                loading ? 
                <BookmarkItem yes24Link={null} interparkLink={null} conContent={''}
                 conNo={0} conPlace={''} conTitle={''} conTime={''}
                 conStart={''} conEnd={''} createdDate={''} posterUrl={''}
                 singer={''} updatedDate={null}                
                />
                :
                <div className = {styled.contentBox}> 
                    <Loading className= {styled.loading}/>
                </div>
            }
        </div>
    )
}

export default Bookmark;