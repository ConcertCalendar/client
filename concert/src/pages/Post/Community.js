import postDummyData from '../../assets/postdummy.json';
import Pagenation from './Pagenation';
import './Community.css'
import { useEffect, useState } from 'react';
import PostList from './PostList';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function Community(){
    const communityArr = ["자유 게시판" , "공연 후기 게시판"]
    const [communityName, setCommunityName] = useState("");
    const {boardId} = useParams();
    const [loading ,setLoading] = useState(false);
    const [post,setPost] = useState([]);
    const location = useLocation();
    
    useEffect( ()=> {
        setCommunityName(communityArr[boardId - 11]);
        async function getData(){
            const response = await axios.get(`http://3.37.69.149:8080${location.pathname}`)
            if(response.status === 200){
                setLoading(true);
                console.log(response.data.data)
                setPost(response.data.data);
                return; 
            }
            setLoading(false);
        }
        getData();
    }, [location]);
   

    const getPost = async () => {
        try{
            axios.get(`http://3.37.69.149:8080${location.pathname}`)
            .then((res) => {
                console.log(res);
                setLoading(true);
                return res.data.data;
            }).catch((err)=>{
                console.log("inAxiosErr" , err);
            })
        }catch{
            console.log("catchError")
        }        
    }

    return (
        <div className = "communityContainer">
            <div className = "communityName">
                {communityName}
            </div>
            <PostList data = {post} loading = {loading}/>
            <Pagenation page = {Math.ceil(post.length)}/>
        </div>
    )
}

export default Community;