import {  Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Join  from "./pages/Join/Join";
import Mypage  from "./pages/Mypage/Mypage";
import Board from "./pages/Post/Board"
import MyCalendar from './pages/Calendar/MyCalendar'
import Layout from "./layout";
import Post from "./pages/BulletinBoard/Post";
import Write from "./pages/BulletinBoard/Write";
import { useEffect } from "react";
import { axiosInstance } from "./utils/customAxios";
import { useDispatch } from "react-redux";
import { storeAccessToken } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  
  async function reNew(url = 'https://concal.p-e.kr/users/reIssue'){
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
        console.log(accessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `${accessToken}`; //axios 헤더에 accesstoken 값을 넣어줌
  }
  useEffect(()=> {
    reNew();
  }, [])

  return (
    <Routes>
      <Route element = {<Layout/>}>
        <Route path="/" element = {<Home />}/>
        <Route path = "/boards/:boardId"  element = {<Board />}>
          <Route path = "posts/:postId" element = {<Post/>}/>
        </Route> 
        <Route path = "write" element = {<Write/>}/>
        <Route path = "Calendar" element ={ <MyCalendar/>}/>
      </Route>
      <Route path="login" element = {<Login />} />
      <Route path = "join" element = {<Join />} />
      <Route path = "mypage" element = {<Mypage/>} />
    </Routes>
  );
}

export default App;