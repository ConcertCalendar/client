import './Poster.css'
import { useEffect, useState } from "react";
import PosterItem from './PosterItem';

function Poster() {
  const [posterData , setPoserData] = useState([1, 2, 3, 4,5,6,7  ]); 


  //fetch로 갖고올 것
  const makePoster = () => {
    return posterData.map((item , idx)=>
    <div className = {item === 1 ? "posterGridItemFirst" : "posterGridItem"} key = {item} >
        <PosterItem 
         src = {`images/AnyConv.com__poster${item}.WEBP`} link = {"https://tickets.interpark.com/goods/22016203"} ranked = {item}/>
    </div>
    );
  }

  useEffect( ()=> {
    
  }, [])
  //

  return (
    <section className="posterContainer">
      <header className = "posterHeader">TOP RANKED</header>
      <div className = "posterGridContainer">
        {makePoster()}
      </div>
    </section>
    );
  }
  
export default Poster;