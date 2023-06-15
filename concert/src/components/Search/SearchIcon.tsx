import icon from 'assets/search.png';
import styled from './Search.module.scss';

interface SearchIcon {
    childern ?: React.ReactNode;
    className ?: string;
}

const SearchIcon:React.FC<SearchIcon> = (props) => {
    const {className} = props;
    return (
        <div className={className}>
            <img src = {icon} className={styled.searchIcon}/>
        </div>
    )
}

export default SearchIcon;