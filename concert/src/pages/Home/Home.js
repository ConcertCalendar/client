import './Home.css';
import Poster from './poster/Poster';
import SearchBar from './searchBar/SearchBar.js';
import HotPost from  './hotPost/HotPost.js'
import Ticket from './ticketOpen/Ticket';
import RealTime from './realTime/RealTime';
import Advertisement from './advertisement/Advertisement';
import HomeFooter from './Footer/HomeFooter';
import { Calendar } from '@fullcalendar/core';
import MyCalendar from 'pages/Calendar/MyCalendar';


function Home() {
    return (
      <>
        <section className = "homeContainer">
          <aside className ="aside">
            <Advertisement/>
            <RealTime/>
          </aside>
          <SearchBar placeholder = "아티스트,공연장,공연 찾기"/>
          <HotPost/>
          <Ticket/>
        </section>
        <MyCalendar/>
        <Poster />
        <HomeFooter/>
      </>
    );
  }
  
  export default Home;
  