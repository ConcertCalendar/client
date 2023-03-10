import axios from "axios";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inputEmail, inputPassword, setCurrentUser } from "./loginSlice"
import { storeAccessToken , storeRefreshToken } from "../../store/authSlice";
import { getCookie, setCookie } from "../../utils/cookie";
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    const email = useSelector((state) => state.login.email);
    const password = useSelector((state) => state.login.password);
    const loginErrMsg = useSelector((state) => state.login.loginErrMsg);
 //   const currentUser = useSelector((state) => state.login.currentUser);
    const accessToken = useSelector((state)=> state.auth.accessToken);

    const dispatch = useDispatch();
    
    const  data = JSON.stringify({   
        "userEmail" : email,
        "password" : password 
    });

    const navigate = useNavigate();
    const onLoginSuccess = (res) => {
        if (res.data.status === 'OK'){
            dispatch(storeAccessToken(res.data.data.accessToken));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.refreshToken}`;
            setCookie('refreshToken', res.data.data.refreshToken , {
                //httpOnly: true,
                path: "/",
                //sameSite: "None"
            }
                ); 
            dispatch(setCurrentUser(email));
            navigate("/")
        }   
    }
   
    const postLogin = async () => {
        axios.post("http://3.37.69.149:8080/users/login", data
             ,   { 
                headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        })
            .then(onLoginSuccess)
            .then(err => {
               
            })
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
                <div className= {loginErrMsg ? "errmsg" : "nonemsg"}>????????? ?????? ??????????????? ?????? ??????????????????. ???????????? ????????? ?????? ??????????????????.</div>
                <button type = "submit" id = "loginBtn" onClick={loginSubmit}>?????????</button>
            </form>
            <hr/>
            <div id = "socialLogin">
                <h3>SNS??? ???????????????</h3>
                <button type = "button" id ="naver">N</button>
                <button type = "button" id ="kakao">K</button>
                <button type = "button" id ="facebook">F</button>
                <button type = "button" id ="apple">A</button>
            </div>
            <div id = "signUp">
                <a id="join" href = "/join">???????????? ??????</a>
            </div>
            <div id = "find">
                <ul>
                    <li id = "findId">
                        <a href = "/">????????? ??????</a>
                    </li>
                    <li id = "findPassword">
                        <a href = "/">???????????? ??????</a>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
  
  export default Login;


  