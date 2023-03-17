import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import { Link } from 'react-router-dom';
import { getCookie, removeCookie } from './utils/cookie';
import { setCurrentUser } from './pages/Login/loginSlice';
import { storeAccessToken } from './store/authSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Layout = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = (event) => {
    dispatch(storeAccessToken(""));
  }

  useEffect (()=> {
  
  }, [accessToken])

  return (
    <div>
        <Header>
          <ul className = "headerMenu">
            {!accessToken ? <li className = "headerItem"><Link className = "headerLink" to ='./join'>JOIN</Link></li> : <li className = "headerItem" onClick={handleLogout}>LOGOUT</li>}
            {!accessToken ? <li className = "headerItem"><Link className = "headerLink" to ='./login' state = { {from : location.pathname + location.search} }>LOGIN</Link></li> :<Link className = "headerLink" to ='./mypage'>MYPAGE</Link>}
          </ul>
        </Header>
        <Nav />
        <Outlet />
    </div>
  );
};

export default Layout;