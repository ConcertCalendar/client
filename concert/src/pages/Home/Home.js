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
import HoverCalendar from 'components/HoverCalendar/HoverCalendar';


function Home() {
    return (
      <>
        <section className = "homeContainer">
          <section className = "calendarContainer">
            <HomeCalendar/>
            <HoverCalendar/>
          </section>
          <aside className ="aside">
            <Advertisement/>
            <RealTime/>
          </aside>
          <HotPost/>
          <Ticket/>
        </section>
        <Poster />
        <HomeFooter/>
      </>
    );
  }
  
  export default Home;
  