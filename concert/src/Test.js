import LikeImage from 'components/Like/LikeImage';
import './test.css';
import {useState , useRef} from 'react';
import likeImg from './assets/AnyConv.com__like.webp'
import fill from './assets/AnyConv.com__fillheart.webp'
function Test () {
    const [state , setState] = useState(false);
    const ref = useRef();
    const handleOnClick = () => {
        setState(!state)
        ref.current.classList.add('beat');
    }

    return (
    <div onClick={handleOnClick} className='size' ref = {ref}>
        <img src = {state ? fill:likeImg  } alt = "" />
    </div>
    )
}

export default Test;