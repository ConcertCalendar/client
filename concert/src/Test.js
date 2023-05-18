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
        <div className='homediv'>
            <iframe width="560" height="315" 
	        src="https://www.youtube.com/embed/HYsz1hP0BFo" 
	        title="YouTube video player" frameborder="0" 
	        allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>

            <iframe width="560" height="315" 
	        src="https://www.youtube.com/embed/HYsz1hP0BFo" 
	        title="YouTube video player" frameborder="0" 
	        allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>

            <iframe width="560" height="315" 
	        src="https://www.youtube.com/embed/Q-15-2Pu0hI" 
	        title="YouTube video player" frameborder="0" 
	        allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>

            <iframe width="560" height="315" 
	        src="https://www.youtube.com/embed/Q-15-2Pu0hI" 
	        title="YouTube video player" frameborder="0" 
	        allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>

            
        </div>
    )
}

export default Test;