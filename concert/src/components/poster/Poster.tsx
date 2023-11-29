import './Poster.css'
import { useEffect, useState } from "react";
import PosterItem from './PosterItem';
import { axiosInstance } from 'utils/customAxios';

interface posterProps {
    childern : React.ReactNode;
}

interface posterData {
  bookingLink : Array<bookingLink>;
  conContent : string;
  conNo : number;
  conPlace : string;
  conTitle : string;
  concertTime : concertTime;
  createDate : Date | string;
  posterUrl : string;
  singer : string;
  updatedDate : Date | string | null;
  userIdList : Array<number>;
}

interface bookingLink { 
  interparkLink : string | null;
  yes24Link : string | null;
}

interface concertTime {
  conTime : string | Date;
  conState : string | Date;
  conEnd : string | Date;

}
const Poster : React.FC = (props) => {
  const [posterData  , setPosterData] = useState<Array<posterData>>([]);
  //fetch로 갖고올 것
  const makePoster = () => {
    console.log(posterData)
    return posterData.map((item , idx)=>
    <div className = {idx === 0 ? "posterGridItemFirst" : "posterGridItem"} key = {idx} >
        <PosterItem 
         src = {item.posterUrl} ranked = {idx + 1}/>
    </div>
    );
  }

  useEffect( ()=> {
    axiosInstance.get('/calendar/ranking')
    .then((res)=> {
      if(res.status === 200){
        setPosterData(res.data.data);
    }
    })
    .catch((err)=> console.log(err))
  }
  
  , [])
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