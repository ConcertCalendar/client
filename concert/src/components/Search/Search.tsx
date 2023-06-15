import styled from './Search.module.scss';
import SearchIcon from './SearchIcon';
import SearchInput from './SearchInput';

interface Search{
    childern ?: React.ReactNode;
    placeholder ?: string;
    className ?: string;
    uri : string;
}

const Search:React.FC<Search>= (props) => {
    
    const {placeholder, className, uri} = props;
    
    return (
        <div className={className}>
            <SearchIcon className = {styled.icon}/>
            <SearchInput className={styled.input} placeholder={placeholder} uri = {uri}/>
        </div>
    )    
}

export default Search;