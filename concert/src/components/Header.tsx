import React from 'react';
import { Link } from 'react-router-dom';
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
    const dispatch = useDispatch();
    const handlelogout = () => {
      axiosInstance.post('/users/logout')
      .then((res)=>{
        if(res.status === 200)
          dispatch(storeAccessToken(""));
      })
      .catch(err=>console.log(err));
    }

    return (
        <div className= {styled.header}>
          <ul className = {styled.headerMenu}>
            {accessToken ? 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to = './Mypage'>
                MYPAGE
              </Link>
            </li>
            : 
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to ='./join'>
                JOIN
              </Link>
            </li>
            }
            {accessToken ?
            <li className = {styled.headerItem} onClick={handlelogout}>
              LOGOUT          
            </li>
            :
            <li className = {styled.headerItem}>
              <Link className = {styled.headerLink} to ='./login' state = { {from : location.pathname + location.search} }>
                LOGIN
              </Link>
            </li>
            }
            
          </ul>
        </div>
    );
  }
  
  export default Header;