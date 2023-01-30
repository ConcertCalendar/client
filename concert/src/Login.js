import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Login.css'
/*
1. access token은 JS private instance 에 보관.
2. refresh token은 http only, same site strict 로 설정된 cookie 에 보관.
 */
function Login() {
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("")
    const [loginErrMsg , setLoginErrMsg] = useState(false) 
    const  data = JSON.stringify({   
        "email" : email,
        "password" : password 
    });

    const navigate = useNavigate();

    const postLogin = async () => {
        const headers = {
            "Content-Type" : "application/json"
        }   
        axios.post("https://52be071c-beda-400a-9418-11aeb3365269.mock.pstmn.io/login", data
             , headers)
            .then(res =>  {
                console.log(res)
                console.log(res.data)
                if(res.data.status === '200'){
                    localStorage.setItem('accesstoken' , res.data.accesstoken);
                    localStorage.setItem('expiredTime', res.data.expiredTime);
                    localStorage.setItem('refreshToken', res.data.refreshToken); 
                    navigate("/")
                }
                if(res.data.status === '400')
                {
                    setLoginErrMsg(true);
                    setPassword("");
                }
            })
            .then(err => {
               console.log(err);
            })
    }

   

    const loginSubmit = async (event) => {
        event.preventDefault();
        postLogin();
    }


    const handleEmail = (event) => {    
        setEmail(event.target.value);
    }
    
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }


    return (
        <div id = "loginWrap">
            <h1>로그인</h1>
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