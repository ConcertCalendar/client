import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { axiosInstance } from 'utils/customAxios';
import { storeAccessToken } from 'store/authSlice';


interface HeaderProps {
  children : React.ReactNode;
}

const Header : React.FC<HeaderProps> = (props) => {
    const accessToken = useSelector((state : RootState) => state.auth.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handlelogout = () => {
      axiosInstance.post('/users/logout')
      .then((res)=>{
        if(res.status === 200)
          dispatch(storeAccessToken(""));
          navigate('/')
      })
      .catch(err=>console.log(err));
    }

    return (
        <div className= {styled.header}>
          <ul className = {styled.headerMenu}>
            {accessToken ? 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to = './Mypage/userInfo'>
                마이페이지
              </Link>
            </li>
            : 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to ='./join'>
                회원가입
              </Link>
            </li>
            }
            {accessToken ?
            <li className = {styled.headerItem} onClick={handlelogout}>
              로그아웃          
            </li>
            :
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to ='./login' state = { {from : location.pathname + location.search} }>
                로그인
              </Link>
            </li>
            }
            
          </ul>
        </div>
    );
  }
  
  export default Header;