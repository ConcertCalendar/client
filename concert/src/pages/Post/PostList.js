import { useEffect , useState} from 'react'
import './PostList.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function PostList({data , loading}) {
    const [loadingMsg , setLoadingMsg] = useState("Loading");
    const location = useLocation();
    const navigate = useNavigate();
    let count = 0;
    const renderLoding = (count) => { /* Loading 애니메이션 */
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

    const makeChild = () => { /* props로 만든 data로 postList를 랜더링 하는 코드*/
       return data.length === 0 ?  //Connect는 성공했으나 아직 게시글이 없을 때 
        <div>
            게시글이 없습니다.
        </div> :
        data.map((item,idx)=> //Connect도 성공하고 게시글이 있을 때 
        <Link key = {item.id} to = {`posts/${item.id}${location.search}`} className={ (idx % 2 === 0) ? 'postlistBox' : 'postlistBox1' } >
            <div key = {item.id} > 
                <p className = "postlistTitle">{cutTitle(item.postTitle)}</p>
                <p className = "postlistContent">{cutContent(item.postContent)}</p>
            </div>
        </Link>
    )}  


    const cutContent = (content) => { //Content 미리보기를 위한 코드
        if(content.length < 50) //content의 길이가 50이하이면
            return content; //content를 리턴
        else{ //content의 길이가 50이 넘어가면
            const count = parseInt(Math.min(content.length,250) / 50); //줄바꿈을 추가 해야 하는 횟수
            let fixedContent = ""; //줄바꿈을 포함하여 리턴할 콘텐트스트링
            for(let i = 0 ; i < count ; i++){ 
                fixedContent = fixedContent + content.slice(i * 50 , (i+1) * 50) + "\n"; //50글자 마다 줄바꿈
            }
            return fixedContent += "..."
        }
        
    }


    const cutTitle = (Title) => { //Title이 길어서 영역을 넘어갈 경우를 위한 코드
        if(Title.length > 50){ //타이틀의 길이가 50이상이면
            const cuttedTitle = Title.substring(0,50) + "...";
            return cuttedTitle;
        }
        return Title;
    }
    const readPost = (e) => {

    }


    useEffect( () => {
        setInterval(() => renderLoding(count++), 1000);
    }, [data])

    
    return (
        <div className = {loading === true ? "postlistContainer" : "loadingContainer" }>
           {loading ?  makeChild() : 
            <div className  = "loading">
                 {loadingMsg}
            </div>
           }
        </div>
    )
}

export default PostList;