import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import { Link } from 'react-router-dom';
import { setCurrentUid } from './pages/Login/loginSlice';
import { storeAccessToken } from './store/authSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const Layout = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = (event) => {
    dispatch(storeAccessToken(""));
    dispatch(setCurrentUid(""));
  }

  useEffect (()=> {
  
  }, [accessToken])

  return (
    <div>
        <Header />
        <Nav />
        <Outlet/>
    </div>
  );
};

export default Layout;