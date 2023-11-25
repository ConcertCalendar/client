import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import HomeFooter from 'components/Footer/HomeFooter';
import Header from 'components/Header/Header';

const Layout = () => {
  return (
    <div>
        <Header/>
        <Nav />
        <Outlet/>
        <HomeFooter/>
    </div>
  );
};

export default Layout;