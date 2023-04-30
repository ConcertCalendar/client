import { useLocation } from 'react-router-dom';
import styled from './SearchPage.module.scss';
import { useEffect , useState } from 'react';
import Loading from 'components/loading';
import { axiosInstance } from 'utils/customAxios';
import SearchPost from './SearchPost';
import SearchConcert from './SearchConcert';


interface SearchPageProps {
    children ?: React.ReactNode;
}

const SearchPage:React.FC<SearchPageProps> = (props) => {
    const [postLoading , setPostLoading] = useState<Boolean>(false);
    const [concertLoading, setConcertLoading] = useState<Boolean>(false);
    const [postData, setPostData] = useState<any>([]);
    const [concertData, setConcertData] = useState<any>([]);
    // 포스터 데이터
    const [day, setDay] = useState<string>("");
    const [id, setId ] = useState<number>(0);
    const [singer, setSinger] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [interPark, setInterPark] = useState<string>("");
    const [yes24, setYes24] = useState<string>("");
    const [poster, setPoster] = useState<string>("");
    const location = useLocation();
    const searchKeyword = decodeURI(location?.search)


  /*  const getCalendarSearch = async() => {
        const response = await axiosInstance.get(`/calendar/searchEvent?searchKeyword=${search}`);
        if(response.status === 200){
            console.log('calendarres', response)
        }
    }*/
    
    const makePostChild = () => {
        if(postData.length === 0)
            return <div className= {styled.none}> 검색 결과가 없습니다. </div>
        return postData.map((item :any)=> (
            <SearchPost key = {item.id} boardId={item.boardId} commnetSize={item.commnetSize} createdDate={item.createdDate} 
            id={item.id} modifiedDate={item.modifiedDate} postContent={item.postContent} postHeartSet={item.postHeartSet}
            postHeartSize={item.postHeartSize} postTitle={item.postTitle} writerId={item.writerId} writerName={item.writerName}/>
        )) 
    }
    
    
    const makeConcertChild = () => {
        if(concertData.length === 0)
            return <div className= {styled.none}> 검색 결과가 없습니다. </div>
        return concertData.map((item :any)=> (
            <SearchConcert key = {item.conNo} interparkLink={item.bookingLink.interparkLink} yes24Link={item.bookingLink.yes24Link} conContent={item.conContent} 
            conNo={item.conNo} conPlace={item.conPlace} conTitle={item.conTitle} conTime={item.concertTime.conTime} conStart={item.concertTime.conStart}
            conEnd={item.concertTime.conEnd} createdDate={item.createdDate} posterUrl={item.posterUrl} singer={item.singer} updatedDate={item.updatedDate}/>   )) 
    }

    useEffect(()=> {
        async function getPostSearch() {
            const response = await axiosInstance.get(`/posts/search${searchKeyword}`);
            if(response.status === 200){
                setPostData(response.data.data.boardDtoList); 
                console.log(response)
                setPostLoading(true);
            }         
        }
        getPostSearch();
    },[searchKeyword ,postLoading])


    useEffect(()=> {
        async function getConcertSearch() {
            const res = await axiosInstance.get(`/calendar/searchEvent${searchKeyword}`);
            if(res.status === 200){
                console.log(res)
                setConcertData(res.data.data);
                setConcertLoading(true);
            }
        }
        getConcertSearch();
    } , [searchKeyword , concertLoading])

    return (
        <div className = {styled.SearchPageContainer}>
            {concertLoading?
            <section className = {styled.concertSearchContainer}>
                <div className = {styled.info}>공연 정보</div>
                <div className = {styled.SearchConcert}>
                    {makeConcertChild()}
                </div>
            </section>
            :
            <section className = {styled.loadingContainer}>
                <div className = {styled.info}>공연 정보</div>
                <Loading className = {styled.loading}/>
            </section>
          
            }
            {postLoading?
            <section className = {styled.postSearchContainer}>
                <div className = {styled.info}>게시글</div>
                {makePostChild()}
            </section> 
            :
            <section className = {styled.loadingContainer}>
                <div className = {styled.info}>게시글</div>
                <Loading />
            </section>
            }
            
        </div>

    )
}

export default SearchPage;