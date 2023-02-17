import {  Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Join  from "./pages/Join/Join";
import Mypage  from "./pages/Mypage/Mypage";
import Community from "./pages/Post/Community"
import MyCalendar from './pages/Calendar/MyCalendar'
import Layout from "./layout";


function App() {
  return (
    <Routes>
      <Route element = {<Layout/>}>
        <Route path="/" element = {<Home />}/>
        <Route path = "board/:boardId"  element = {<Community />} />
        <Route path = "Calendar" element ={ <MyCalendar/>}/>
      </Route>
      <Route path="login" element = {<Login />} />
      <Route path = "join" element = {<Join />} />
      <Route path = "mypage" element = {<Mypage/>} />
    </Routes>
  );
}

export default App;
