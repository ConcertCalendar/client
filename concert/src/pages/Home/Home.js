import './Home.css';
import Ticket from './ticketOpen/Ticket';
import HomeFooter from './Footer/HomeFooter';
import HomeCalendar from 'pages/Calendar/HomeCalendar';


function Home() {
    return (
      <>
        <section className = "homeContainer">
          <section className = "calendarContainer">
            <HomeCalendar/>
          </section>
          <Ticket/>
        </section>
        <HomeFooter/>
      </>
    );
  }
  
  export default Home;
  