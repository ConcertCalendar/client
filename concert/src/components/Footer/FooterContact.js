import './FooterContact.css'

function FooterContact ({position , name , mail, github}) {
    return (
    <div className = 'footerContactContainer'>
        <div className = "ContactName">
            {position} : {name}
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__mail.WEBP'} alt = "contact" className = "footerContactImg"/>
              {mail}
            </div>
            <div className = "contactWrap">
              <img src = {'images/AnyConv.com__github.WEBP'} alt = "contact" className = "footerContactImg"/>
              {github}
            </div>
        </div>
    </div>
)}

export default FooterContact;