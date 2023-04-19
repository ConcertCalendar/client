import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/customAxios';
import styled from './UserPosts.module.scss';
import UserPostItem from './UserPostItem';
import Loading from 'components/loading';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
interface userPosts {
    children ?: React.ReactNode; 
 }

interface postData {
    boardId : number;
    commentDtoList : Array<string>;
    createdDate : string | Date;
    id : number;
    modifiedDate : null | string | Date;
    postContent : string;
    postHeartSet : Array<string> 
    postHeartSize : number;
    postTitle : string;  
    writerId : number;
    writerName : string; 
}

const UserPosts:React.FC<userPosts> = (props) => {
    const [data , setData] = useState<Array<postData>>([]); 
    const [loading , setLoading] = useState<boolean>(false);
    const currentUserEmail = useSelector((state:RootState) => state.login.currentUserEmail);
    const checkFill = (postHeartSet : Array<string>) => {
        if(postHeartSet.includes(currentUserEmail))
            return true;
        return false;
    }

    const makechilde = ( data : Array<postData>) => {
        return data.map((item)=> (
            <div className = {styled.contentBox}>
                <UserPostItem key = {item.id} boardId={item.boardId} commentDtoList={item.commentDtoList}
                createdDate={item.createdDate} id={item.id} modifiedDate={item.modifiedDate}
                postContent={item.postContent} postHeartState={checkFill(item.postHeartSet)}
                postHeartSize={item.postHeartSize} postTitle={item.postTitle} writerId={item.writerId}
                writerName={item.writerName} />
            </div>  
        ))
    }
    
    useEffect (()=> {
    async function getData () {
        const response = await axiosInstance.get('/users/posts');
        if(response.status === 200){
            console.log(response)
            setData(response.data.data);
            setLoading(true);
        }
    }
    
    getData();
    
    }, [loading]);


    return (
        <div className={styled.contentContainer}>
            <div className = {styled.title}>
                MY POST <span className = {styled.subtitle}>내 작성글</span>
            </div>
            { 
                loading ? makechilde(data) :
                <div className = {styled.contentBox}> 
                    <Loading className= {styled.loading}/>
                </div>
            }
        </div>     
    )
}

export default UserPosts;
