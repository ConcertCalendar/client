import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Nav from '../../components/Nav';

const Layout = () => {
  return (
    <div>
        <Header />
        <Nav />
        <Outlet/>
    </div>
  );
};

export default Layout;