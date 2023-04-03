import styled from './Nav.module.scss'
import NavLogo from './Nav/NavLogo';
import NavItem from './Nav/NavItem';
import navLogoImage from '../assets/AnyConv.com__logo.webp'

function Nav() {  
  return (
      <div className= {styled.navContainer}>
        <div className = {styled.NavItemContainer} >    
          <NavLogo navLogoImage={navLogoImage} navLink = {"/"}/>
          <NavItem itemName = {"HOME"} navLink = {"/"}/>
          <NavItem itemName = {"CALENDAR"} navLink = {"Calendar"}/>
          <NavItem itemName = {"COMMUNITY"} navLink = {"/boards/1?page=0"} color = 'red'/>
        </div>
    </div>
  );
  }
  
export default Nav;