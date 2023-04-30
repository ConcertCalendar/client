import './Home.css';
import Poster from './poster/Poster';
import SearchBar from './searchBar/SearchBar.js';
import HotPost from  './hotPost/HotPost.js'
import Ticket from './ticketOpen/Ticket';
import RealTime from './realTime/RealTime';
import Advertisement from './advertisement/Advertisement';
import HomeFooter from './Footer/HomeFooter';
import { Calendar } from '@fullcalendar/core';
import HomeCalendar from 'pages/Calendar/HomeCalendar';


function Home() {
    return (
      <>
        <section className = "homeContainer">
          <aside className ="aside">
            <Advertisement/>
            <RealTime/>
          </aside>
          <HotPost/>
          <Ticket/>
        </section>
        <HomeCalendar/>
        <Poster />
        <HomeFooter/>
      </>
    );
  }
  
  export default Home;
  