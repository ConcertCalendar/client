import {  Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Mypage  from "./pages/Mypage/Mypage";
import Layout from "./pages/Layout/layout";
import { useEffect } from "react";
import { axiosInstance } from "./utils/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { storeAccessToken } from "./store/authSlice";
import UserInfo from "pages/Mypage/UserInfo";
import UserPosts from "pages/Mypage/UserPosts";
import Bookmark from "pages/Mypage/Bookmark";
import SearchPage from "pages/Home/Search/SearchPage";
import NotFound from "pages/BulletinBoard/NotFound/NotFound";
import WriteTest from "pages/BulletinBoard/write/WriteTest";
import DetailPost from "pages/Post/DetailPost";
import Board from "pages/Board/Board";
import Report from "components/Report/Report";
import CalendarTest from "pages/Calendar/Test/CalendarTest";
import { isAuth } from "utils/JwtUtils";
import { RootState } from "store/store";
import Join from "pages/Join/Join";



function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state:RootState)=> state.auth.accessToken);

  const reIssue = () => {
    axiosInstance.post('users/reIssue').then((res)=> {
      console.log(res)
      axiosInstance.defaults.headers.common["Authorization"] = `${res.data.data}`;
      dispatch(storeAccessToken(res.data.data));
    })
  }

  /*async function reNew(url = 'https://dev.pushpin.co.kr/users/reIssue'){
    await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE 등
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }).then((res)=> res.json())
      .then((data) => {
        if(data.status === "OK")
          reNewSuccess(data.data)
      }
    )}
  const reNewSuccess = (accessToken) => {
        dispatch(storeAccessToken(accessToken)); //accessToken을 저장
        dispatch(setCurrentUid(getUserId(accessToken))); 
        dispatch(setCurrentUserEmail(getUserEmail(accessToken)));
        axiosInstance.defaults.headers.common["Authorization"] = `${accessToken}`; //axios 헤더에 accesstoken 값을 넣어줌
  }
  */


  useEffect(()=> {
    window.addEventListener('load' , ()=> {
      const reloading = sessionStorage.getItem("reloading");
      const login = sessionStorage.getItem('login');
      if(reloading && login){
        sessionStorage.removeItem('reloading');
        reIssue();
      }})
    window.addEventListener('keydown' , (e) => {
     if(e.key === 'F5' ){
        sessionStorage.setItem('reloading', 'true');
        document.location.reload();
      }
    })

    const checkAuth = setInterval(()=> { //1초마다 탐색
        if(accessToken !== "" && !isAuth(accessToken)){//accesstoken이 존재하고 만료기한이 끝나면
          reIssue();
        }    
      }, 1000)
    return ()=> {
      clearInterval(checkAuth);
    }

  }, [accessToken])

  return (
    <Routes>
      <Route element = {<Layout/>}>
        <Route path = "mypage" element = {<Mypage/>}>
          <Route path = "userInfo" element = {<UserInfo/>}/>
          <Route path = "bookMark" element = {<Bookmark/>}/>
          <Route path = "myWrite" element = {<UserPosts/>}/>
        </Route>
        <Route path = '/search' element = {<SearchPage/>}/>
        <Route path="/" element = {<Home />}/>
        <Route path = "/boards/:boardId"  element = {<Board />}/>
        <Route path = "/boards/:boardId/posts/:postId" element = {<DetailPost/>}/>
        <Route path = "write" element = {<WriteTest/>}/>
        <Route path = "Calendar" element ={ <CalendarTest/>}/>
        <Route path = "join" element = {<Join/>} />
        <Route path = 'testwrite'element = {<WriteTest/>}/>
        <Route path = 'testPost'element = {<DetailPost/>}/>
      </Route>
      <Route path="login" element = {<Login />} />
      <Route path="test" element = {<Report/>} />
            <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;