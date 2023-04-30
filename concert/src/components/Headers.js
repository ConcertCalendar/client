import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from './Header.module.scss';

function Headers({children}) {  
  
  useEffect(() => {
  
  } ,[])

    return (
        <div className= {styled.header}>
          <ul className = {styled.headerMenu}>
            <li className = {styled.headerItem}><Link className = {styled.headerLink} to ='./join'>회원가입</Link></li> 
            <li className = {styled.headerItem}><Link className = {styled.headerLink} to ='./login' state = { {from : location.pathname + location.search} }>로그인</Link></li>
            <li className = {styled.headerItem}><Link className = {styled.headerLink} to ='./mypage/userInfo'>마이페이지</Link></li>
          </ul>
        </div>
    );
  }
    
  export default Headers;