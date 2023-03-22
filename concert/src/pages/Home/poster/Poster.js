import './Poster.css'
import { useEffect, useState } from "react";
import PosterItem from './PosterItem';

function Poster() {
  const [posterData , setPoserData] = useState([1, 2, 3, 4, 5, 6]); 
  const [startOffset, setStartOffset ] = useState(0);
  const [endOffset , setEndOffset ] = useState(3);
  const [leftInMouse, setLeftInMouse] = useState(false);
  const [rightInMouse, setRightInMouse] = useState(false);

  const leftMouse = (event) => {
    setLeftInMouse(!leftInMouse)
  }
  
  const onClickLeft = () => {
    setStartOffset(startOffset-1)
    console.log(startOffset)
  }  
  const rightMouse = (event) => {
    setRightInMouse(!rightInMouse)
  }
    
  //fetch로 갖고올 것
  const makePoster = () => {
    return posterData.map((item , idx)=>
      <li key = {item} className = {idx > endOffset ? "hiddenItem" : "showItem" }>
         <PosterItem src = {`images/poster${item}.jpeg`} link = {"https://tickets.interpark.com/goods/22016203"} />
      </li>
    );
  }

  useEffect( ()=> {
    
  }, [endOffset , startOffset])
  //

  return (
    <div className ='test'>
    <section className="posterContainer">
      <div className = "poster">
        <div onMouseEnter={leftMouse} onMouseLeave = {leftMouse}>
          <img onClick = {onClickLeft} src = "images/left-arrow.png" className = {leftInMouse ?  "arrowImg" : "hiddenBtn"}  alt = ""/>
        </div>
        <ul className = "posterUl">
          {makePoster()}
        </ul>
        <div onMouseEnter={rightMouse} onMouseLeave = {rightMouse}>
          <img src = "images/right-arrow.png" className = {rightInMouse ?  "arrowImg" : "hiddenBtn"} alt = ""/>
        </div>
      </div>
    </section>
    </div>
    );
  }
  
export default Poster;