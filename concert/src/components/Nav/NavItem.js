import styled from './NavItem.module.scss';
import { Link } from 'react-router-dom';

function NavItem ({itemName, navLink , color}){

    return(
        <div className = {styled.navItemContainer}>
            <Link className = {color === 'red' ? `${styled.navItemLink} ${styled.red}` : styled.navItemLink} to = {navLink}>
                {itemName}
            </Link>
        </div>
    )
}
export default NavItem;