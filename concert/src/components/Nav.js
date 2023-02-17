import { useRef } from 'react';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css'
import { throttle } from 'lodash'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Nav() {
  const [hover, setHover] = useState(false);
  const scrollRef = useRef(null);
  const headerHeight = useSelector((state)=>state.header.headerHeight)
  const [fixed , setFixed] = useState(false);
  const navigate = useNavigate();
  
  const onClickNav = (event) => {
    console.log(event);  
    navigate("/"+event.target.innerText);
  }
  const onClickCalendarNav = (event) => {
    navigate("/Calendar");
  }
  
  const onClickHome = () => {
    navigate("/");
  }
  const handleScroll = () => {
    if(window.scrollY > headerHeight){
        scrollRef.current.classList.add("fixedNav");
        setFixed(true);
      }
    else{
        scrollRef.current.classList.remove("fixedNav")
        setFixed(false);
      }
  }

  useEffect (() => {
    window.addEventListener('scroll' , handleScroll);
    return () => {
      window.removeEventListener('scroll' , handleScroll);
    }
  },[])
  
  return (
      <div className="navContainer"   onMouseLeave={()=>{setHover(false)}}>
        <div className='nav' ref = {scrollRef}>
          <div className = 'nonDropDownNav'>
            <Link className = 'navLink' to ="/">
              <img className='navLogo' src = "Images/logo.png" alt = ""/>
            </Link>
            <ul className = "navMenu">
              <Link className = 'navLink' to ="/">
                <li className = { fixed ? "fixedNavItem" : "navItem"}>HOME</li>
              </Link>
              <Link className = 'navLink' to ="/Calendar">
                <li className = { fixed ? "fixedNavItem" : "navItem"}>CALENDAR</li>
              </Link>
              <Link className = 'navLink' to ="/board/12">
                <li className ="navItem community" onMouseEnter={() => {
                  console.log("horvering")
                  setHover(true)}}>COMMUNITY</li>
              </Link>
            </ul>
          </div>
        </div>
        <div  className = {hover ? "displayDropDownNav" : "dropDownNav"}>
          <ul className='navMenu'>
          <Link className = 'navLink' to ="/board/1">
            <li className='navItem'> 자유 게시판</li>
          </Link>  
          <Link className = 'navLink' to ="/board/2">
            <li className='navItem'> 공연 후기 게시판</li>
          </Link>    
          </ul>
        </div>
      </div>
  );
  }
  
  export default Nav;