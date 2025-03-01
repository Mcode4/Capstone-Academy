import './FooterImg.css'
import { useLocation } from 'react-router-dom'

function FooterImg(){
    const location = useLocation().pathname.split('/')[1]
    const locations = ['', 'home', 'login', 'signup']
    let classToggle = 'offf'

    locations.forEach(loc=>{
        if(loc === location){
            classToggle = 'onn'
        }
    })

    console.log('FOOTER LOCATION', locations)
    return (
        <div id="footer-img" className={classToggle}>
            <img src="../.././public/images/footerImg2.png" alt="" />
        </div>
    )
}

export default FooterImg