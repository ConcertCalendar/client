import FooterContact from "./FooterContact";
import './HomeFooter.css'

function HomeFooter() {
    return (
     <footer className = 'footer'>
        <div className = 'footerContent'>
            <FooterContact position={'FrontEnd'} name = {"HwiGyung Lee"} mail = {'ter0000@naver.com'} github = {'https://github.com/LeeHwiGyoung'}/>
            <FooterContact position={'BackEnd'} name = {"JoongHyun Lee"} mail = {'tbvjqlqlqlr@naver.com'} github = {'https://github.com/joong2043'}/>
        </div>
     </footer>
    )
}

export default HomeFooter;