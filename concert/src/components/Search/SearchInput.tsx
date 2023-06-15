import { axiosInstance } from 'utils/customAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchInput {
    childern ?: React.ReactNode;
    className ?: string;
    placeholder ?: string;
    uri : string;
}

const SearchInput:React.FC<SearchInput> = (props) => {
    const {placeholder , className , uri} = props;
    const [keyWord,setKeyWord] = useState<string>(""); //input value

    const navigate = useNavigate();
    //props로 받은 uri로 API를 호출하여 검색을 할 함수
    const search = () => {
        //navigate(`./search?searchKeyword=${keyWord}`)
        /*axiosInstance.get(`${uri}?searchKeyword=${keyWord}`) 
        .then((res)=>console.log(res))
        .catch((err)=> console.log(err))*/
    
    }

    const saveLocalStorage = () => {

    }
    //엔터키 입력시 search를 호출할 함수
    const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){ //엔터 키 입력
            search()
        }
    }
    
    //input의 value 값의 변경을 감지할 함수
    const handleChagne = (e:React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value);
    }

    return (
        <input onChange={handleChagne} onKeyUp = {handleEnter} className={className} placeholder={placeholder} value = {keyWord}/>
    )
}

export default SearchInput;