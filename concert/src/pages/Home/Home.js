import './Home.css';
import Poster from './poster/Poster.js';
import SearchBar from './searchBar/SearchBar.js';
import HotPost from  './hotPost/HotPost.js'
import Ticket from './ticketOpen/Ticket';
import RealTime from './realTime/RealTime';
import Advertisement from './advertisement/Advertisement';


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
      <Poster />
      <footer className = 'footer'>
        <div className = 'footerContent'>
          <div className = "frontContact">
            FrontEnd : HwiGyung Lee
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__phone.WEBP'} alt = "contact" className = "footerContactImg"/>
              010-2378-5924
            </div>
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__mail.WEBP'} alt = "contact" className = "footerContactImg"/>
              ter0000@naver.com
            </div>
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__github.WEBP'} alt = "contact" className = "footerContactImg"/>
              https://github.com/LeeHwiGyoung
            </div>
          </div>
          <div className= "backContact">
            BackEnd : JoongHyun Park
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__phone.WEBP'} alt = "contact" className = "footerContactImg"/>
              ??
            </div>
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__mail.WEBP'} alt = "contact" className = "footerContactImg"/>
              ??
            </div>
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__github.WEBP'} alt = "contact" className = "footerContactImg"/>
              https://github.com/joong2043
            </div>
          </div>
        </div>
      </footer>
      </>
    );
  }
  
  export default Home;
  