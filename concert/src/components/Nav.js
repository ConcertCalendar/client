import { useEffect, useRef, useState } from 'react';
import styled from './Nav.module.scss'
import NavLogo from './Nav/NavLogo';
import NavItem from './Nav/NavItem';


function Nav() {

  
  return (
      <div className= {styled.navContainer}>
        <div className = {styled.NavItemContainer} >    
          <NavLogo navLogoImage={"Images/AnyConv.com__logo.WEBP"} navLink = {"/"}/>
          <NavItem itemName = {"HOME"} navLink = {"/"}/>
          <NavItem itemName = {"CALENDAR"} navLink = {"Calendar"}/>
          <NavItem itemName = {"COMMUNITY"} navLink = {"/board/1"} color = 'red'/>
        </div>
    </div>
  );
  }
  
export default Nav;