import {useEffect} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { axiosInstance } from 'utils/customAxios';
import { storeAccessToken } from 'store/authSlice';
import { setPhase } from 'store/joinSlice';


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
          sessionStorage.removeItem('login');
          dispatch(storeAccessToken(""));
          navigate('/')
      })
    }

    return (
        <div className= {styled.header}>
          <div className = {styled.headerMenu}>
          <ul className = {styled.headerList}>
            {accessToken ? 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink}  to = './Mypage/userInfo'>
                마이페이지
              </Link>
            </li>
            : 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} onClick={()=> dispatch(setPhase('0'))} to ='./join' state = {{ from :location.pathname + location.search}}>
                회원가입
              </Link>
            </li>
            }
            {accessToken?
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
  
        </div>
    );
  }
  
  export default Header;