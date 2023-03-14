import axios from "axios";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { inputEmail, inputPassword, setCurrentUser } from "./loginSlice"
import { storeAccessToken } from "../../store/authSlice";
import { getCookie, setCookie } from "../../utils/cookie";
import { Link } from "react-router-dom";
import './Login.css'
import { baseInstance } from "../../utils/customAxios";

function Login() {
    const {state} = useLocation();
    const email = useSelector((state) => state.login.email);
    const password = useSelector((state) => state.login.password);
    const loginErrMsg = useSelector((state) => state.login.loginErrMsg);
    const currentUser = useSelector((state) => state.login.currentUser);
    const accessToken = useSelector((state)=> state.auth.accessToken);

    const dispatch = useDispatch();
    
    const  data = JSON.stringify({   
        "userEmail" : email,
        "password" : password 
    });

    const navigate = useNavigate();

    async function postLogin(url = 'https://concal.p-e.kr/users/login' , data = { "userEmail" : email, "password" : password }){
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
            body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          }).then(resonse=> resonse.json())
          .then(json=> console.log(JSON.stringify(json))) // JSON 응답을 네이티브 JavaScript 객체로 파싱
        }




    const loginSubmit = async (event) => {
        event.preventDefault();
        postLogin();        
    }


    const handleEmail = (event) => {    
        dispatch(inputEmail(event.target.value));
    }
    
    const handlePassword = (event) =>{
        dispatch(inputPassword(event.target.value));
    }


    return (
        <div id = "loginWrap">
            <Link to = "/">
                <img className="loginLogo" src = "Images/logo.png" alt = ""/>
            </Link>
            <form id = "loginForm">
                <input type = "text" id = "idInput" placeholder="Email"  onChange = {handleEmail}/>
                <br/>
                <input type = "password" id = "passwordInput"placeholder="password" onChange = {handlePassword} value = {password}/>
                <div className= {loginErrMsg ? "errmsg" : "nonemsg"}>아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</div>
                <button type = "submit" id = "loginBtn" onClick={loginSubmit}>로그인</button>
            </form>
            <hr/>
            <div id = "socialLogin">
                <h3>SNS로 로그인하기</h3>
                <button type = "button" id ="naver">N</button>
                <button type = "button" id ="kakao">K</button>
                <button type = "button" id ="facebook">F</button>
                <button type = "button" id ="apple">A</button>
            </div>
            <div id = "signUp">
                <a id="join" href = "/join">회원가입 하기</a>
            </div>
            <div id = "find">
                <ul>
                    <li id = "findId">
                        <a href = "/">아이디 찾기</a>
                    </li>
                    <li id = "findPassword">
                        <a href = "/">패스워드 찾기</a>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
  
  export default Login;


  