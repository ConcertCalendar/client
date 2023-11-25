import styled from './Search.module.scss'
import searchImage from './SearchImage.svg'
interface Search{
    childern ?: React.ReactNode;
    placeholder ?: string;
}

const SearchBar:React.FC<Search>= (props) => { 
    const {placeholder} = props;

    
    return (
        <div className={styled.searchWrap}>
            <input className = {styled.searchInput} placeholder={placeholder} />
            <img className={styled.searchImage} src = {searchImage} />
        </div>
    )    
}

export default SearchBar;