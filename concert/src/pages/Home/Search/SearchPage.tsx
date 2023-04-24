interface SearchPageProps {
    children ?: React.ReactNode;
}
import styled from './SearchPage.module.scss';


const SearchPage:React.FC<SearchPageProps> = (props) => {
    return (
        <div className = {styled.SearchPageContainer}>
            검색 결과

        </div>

    )
}

export default SearchPage;