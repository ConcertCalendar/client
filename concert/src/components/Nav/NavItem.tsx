import styled from './NavItem.module.scss';
import { Link } from 'react-router-dom';

interface NavItemProps {
    children? : React.ReactNode;
    itemName : string;
    navLink : string;
    color?: string;
}


const NavItem: React.FC<NavItemProps> =  (props) => {
    const  {itemName, navLink , color} = props;
    return(
        <div className = {styled.navItemContainer}>
            <Link className = {color === 'red' ? `${styled.navItemLink} ${styled.red}` : styled.navItemLink} to = {navLink}>
                {itemName}
            </Link>
        </div>
    )
}


export default NavItem;