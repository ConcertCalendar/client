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
import { getCookie } from "./utils/cookie"
import { useSelector } from "react-redux";

function App() {
  
  useEffect(()=> {
 
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