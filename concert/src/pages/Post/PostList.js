import { useEffect , useState} from 'react'
import './PostList.css'
import { Link } from 'react-router-dom'
function PostList({data , loading}) {
    const [loadingMsg , setLoadingMsg] = useState("Loading");
    let count = 0;
    const renderLoding = (count) => {
        if (count % 4 === 0){
            setLoadingMsg("Loading")
        }
        else if(count %  4 === 1){
            setLoadingMsg("Loading·")
        }
        else if(count % 4 === 2){
            setLoadingMsg("Loading··")
        }
        else{
            setLoadingMsg("Loading···")
        }
    }

    const makeChild = () => {
       return data.length === 0 ? 
       <div>
            게시글이 없습니다.
        </div> :
        data.map((item,idx)=>         
        <div key = {item.id} className={ (idx % 2 === 0) ? 'postBox' : 'postBox1'} onClick = {readPost}>
            <p className = "postTitle">{cutTitle(item.postTitle)}</p>
            <p className = "postContent">{cutContent(item.postContent)}</p>
        </div>
        
    )}  


    const cutContent = (content) => {
        if(content === null || content.length < 50)
            return content;
        else{
            const count = parseInt(Math.min(content.length,250) / 50);
            let fixedContent = ""; 
            for(let i = 0 ; i < count ; i++){
                fixedContent = fixedContent + content.slice(i * 50 , (i+1) * 50) + " ";
            }
            return fixedContent += "..."
        }
        
    }


    const cutTitle = (Title) => {
        if(Title !== null && Title.length > 50){
            const cuttedTitle = Title.substring(0,50) + "...";
            return cuttedTitle;
        }
        return Title;
    }
    const readPost = () => {
        <Link to >
            
        </Link>
    }


    useEffect( () => {
        setInterval(() => renderLoding(count++), 1000);
    }, [data])

    
    return (
        <div className = {loading === true ? "postContainer" : "loadingContainer" }>
           {loading ?  makeChild() : 
            <div className  = "loading">
                 {loadingMsg}
            </div>
           }
        </div>
    )
}

export default PostList;