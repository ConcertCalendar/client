import styled from './Nav.module.scss'
import NavLogo from './NavLogo';
import NavItem from './NavItem';
import navLogoImage from '../../assets/pushpinLogo.svg';
import SearchBar from 'components/Search/SearchBar';

function Nav() {  
  return (
      <div className= {styled.navContainer}>
        <div className = {styled.NavItemContainer} >    
          <NavLogo navLogoImage={navLogoImage} navLink = {"/"}/>
          <NavItem itemName = {"캘린더"} navLink = {"/"}/>
          <NavItem itemName = {"커뮤니티"} navLink = {"/boards/1?page=0"}/>
          <SearchBar placeholder='검색어를 입력해 주세요.' />
        </div>
    </div>
  );
  }
  
export default Nav;