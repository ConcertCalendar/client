import { axiosInstance } from 'utils/customAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyWordStorage } from 'utils/keyWordStorage';
import styled from './Search.module.scss';

interface SearchInput {
    childern ?: React.ReactNode;
    className ?: string;
    placeholder ?: string;
    uri : string;
}

const SearchInput:React.FC<SearchInput> = (props) => {
    const {placeholder , className , uri} = props;
    const [keyWord,setKeyWord] = useState<string>(""); //input value
    const [focus, setFocus] = useState<boolean>(false);
    const recentStorage = new keyWordStorage('recent', []);

    const navigate = useNavigate();
    //props로 받은 uri로 API를 호출하여 검색을 할 함수
    const search = () => {
        //navigate(`./search?searchKeyword=${keyWord}`)
        /*axiosInstance.get(`${uri}?searchKeyword=${keyWord}`) 
        .then((res)=>console.log(res))
        .catch((err)=> console.log(err))*/
    
    }

    const saveLocalStorage = () => {
        recentStorage.set(keyWord);
    }
    //엔터키 입력시 search를 호출할 함수
    const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){ //엔터 키 입력
            saveLocalStorage();
            console.log(recentStorage.get())
            search();
        }
    }
    
    //input의 value 값의 변경을 감지할 함수
    const handleChagne = (e:React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value);
    }

    const makeRecent = () => {
        return  recentStorage.get().map((item)=> (
            <li onClick = {()=> console.log('click', item)}>
                {item}
            </li>
        ))
    }

    return (
        <>
            <input onChange={handleChagne} onKeyUp = {handleEnter} className={className} onFocus={()=>setFocus(true)}
             onBlur={()=>setFocus(false)} placeholder={placeholder} value = {keyWord} >
            </input>
            {focus && 
                <ul className = {styled.searchList} >최근 검색어
                    {makeRecent()}
                </ul>}
        </>
    )
}

export default SearchInput;