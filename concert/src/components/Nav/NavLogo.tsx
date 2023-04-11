import styled from './NavLogo.module.scss';
import { Link } from 'react-router-dom';


interface navLogoProps {
    children? : React.ReactNode;
    navLogoImage : string;
    navLink : string;
}

const NavLogo: React.FC<navLogoProps> = (props) => {
    const {navLogoImage , navLink} = props;
    return(
        <div className = {styled.navLogoContainer}>
            <Link className = {styled.navLogoLink} to = {navLink}>
                <img className= {styled.navLogoImage} src = {navLogoImage} alt = "navLogo"/>
            </Link>
        </div>
    )
}
export default NavLogo;