import styled from './NavLogo.module.scss';
import { Link } from 'react-router-dom';

function NavLogo ({navLogoImage , navLink}){
    return(
        <div className = {styled.navLogoContainer}>
            <Link className = {styled.navLogoLink} to = {navLink}>
                <img className= {styled.navLogoImage} src = {navLogoImage} alt = "navLogo"/>
            </Link>
        </div>
    )
}
export default NavLogo;