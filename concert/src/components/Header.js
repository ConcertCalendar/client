import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from './Header.module.scss';
import {setHeaderHeight} from './headerSlice';

function Header({children}) {  
  const headerRef = useRef(null);
  const height = useSelector((state)=>state.header.headerHeight)
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(setHeaderHeight(headerRef.current.clientHeight));  
  } ,[])

    return (
        <div className= {styled.header} ref = {headerRef}>
          <ul className = {styled.headerMenu}>
            <li className = {styled.headerItem}><Link className = {styled.headerLink} to ='./join'>JOIN</Link></li> 
            <li className = {styled.headerItem}><Link className = {styled.headerLink} to ='./login' state = { {from : location.pathname + location.search} }>LOGIN</Link></li>
          </ul>
        </div>
    );
  }
  
  export default Header;