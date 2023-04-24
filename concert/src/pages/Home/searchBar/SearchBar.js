import { axiosInstance } from 'utils/customAxios';
import './SearchBar.css'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function SearchBar({placeholder}) {
    const [search , setSearch] = useState("");
    const navigate = useNavigate();

    const handleEnter = (e) => {
        if(e.key === "Enter")
            clickSearch()
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const getPostSearch = async() => {
        const response = await axiosInstance.get(`/posts/search?searchKeyword=${search}`);
        if(response.status === 200){
            console.log('postres', response)
        }
    }

    const getCalendarSearch = async() => {
        const response = await axiosInstance.get(`/calendar/searchEvent?searchKeyword=${search}`);
        if(response.status === 200){
            console.log('calendarres', response)
        }
    }

    const clickSearch = () => {
        getPostSearch();
        getCalendarSearch();
        navigate('search')
        
    }
    return (
        <div className="SearchContainer">
            <input className='searchBar' placeholder = {placeholder} value = {search} onChange={handleSearch} onKeyDown={handleEnter}/>
            <img src = "images/search.png" className = "searchImg"  alt = "" onClick = {clickSearch}/>
        </div>
    );
  }
  
  export default SearchBar;