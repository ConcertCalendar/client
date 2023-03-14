import './SearchBar.css'
function SearchBar({placeholder}) {
    return (
        <div className="SearchContainer">
            <img src = "images/search.png" className = "searchImg"  alt = "" />
            <input className='searchBar' placeholder = {placeholder}/>
        </div>
    );
  }
  
  export default SearchBar;