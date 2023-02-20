import postDummyData from '../../assets/postdummy.json';
import Pagenation from './Pagenation';
import './Community.css'
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Community(){
    const communityArr = ["자유 게시판" , "공연 후기 게시판"]
    const [communityName, setCommunityName] = useState("");
    const {boardId} = useParams();
    const [loading ,setLoading] = useState(false);
    const [post,setPost] = useState([]);
    const location = useLocation();
    const [searchParams , setSearchParams] = useSearchParams();
    const offset = searchParams.get('page');

    useEffect( ()=> {
        setCommunityName(communityArr[boardId - 1]);
        async function getData(){
            const response = await axios.get(`http://3.37.69.149:8080${location.pathname}${location.search}`)
            if(response.status === 200){
                console.log(response);
                setLoading(true);
                setPost(response.data.data);
                return; 
            }
            setLoading(false);
        }
        getData();
    }, [location]);
   

    return (
        <div className = "communityContainer">
            <div className = "communityName">
                {communityName}
            </div>
            <PostList data = {post} loading = {loading}/>
            <Pagenation totalPost={20} offset = {offset} />
        </div>
    )
}

export default Community;