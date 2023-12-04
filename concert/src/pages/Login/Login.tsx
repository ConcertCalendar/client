import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { inputEmail, inputPassword, setCurrentUid } from "../../store/loginSlice"
import { Link } from "react-router-dom";
import { storeAccessToken } from "../../store/authSlice";
import { axiosInstance } from "../../utils/customAxios";
import { getUserId } from "utils/JwtUtils";
import { useState } from "react";
import { RootState } from "store/store";
import loginLogo  from "../../assets/pushpinLogo.svg";
import styled from './Login.module.scss';

const Login = () =>  {
    const {state} = useLocation();
    const email = useSelector((state:RootState) => state.login.email);
    const password = useSelector((state:RootState) => state.login.password);
    const [loginErrMsg, setLoginErrmsg] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function postLogin(url = 'https://dev.pushpin.co.kr/users/login' , data = { "userEmail" : email, "password" : password }){
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE 등
            credentials: 'include', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          }).then((res)=> res.json())
            .then((data) => {
                if(data.status === 'OK'){
                    loginSuccess(data.data.accessToken)
                    dispatch(setCurrentUid(getUserId(data.data.accessToken).toString()));
                }else{
                    setLoginErrmsg(true);
                }
            })
        }
    
    const loginSuccess = (accessToken : string) => {
        dispatch(storeAccessToken(accessToken)); //accessToken을 저장
        sessionStorage.setItem('login', 'true');
        axiosInstance.defaults.headers.common["Authorization"] = `${accessToken}`; //axios 헤더에 accesstoken 값을 넣어줌
        navigate(state.from);
    }


    const loginSubmit = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        postLogin();
    }


    const handleEmail = (event:React.ChangeEvent<HTMLInputElement>) => {    
        dispatch(inputEmail(event.target.value));
    }
    
    const handlePassword = (event:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(inputPassword(event.target.value));
    }


    return (
        <div className = {styled.loginContainer}>
            <Link to = "/" className={styled.logoContainer}>
                <img className = {styled.logo} src = {loginLogo} alt ="logo"/>
            </Link>
            <form className = {styled.loginForm}>
                <input className = {styled.email} type = "text" placeholder="Email"  onChange = {handleEmail}/>
                <br/>
                <input className = {styled.password} type = "password" placeholder="password" onChange = {handlePassword} value = {password}/>
                <div className= {loginErrMsg ?`${styled.errmsg}` : `${styled.nonemsg}`}>아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</div>
                <button className = {styled.loginBtn} type = "submit" onClick={loginSubmit}>로그인</button>
            </form>
        </div>
    );
  }
  
export default Login;

