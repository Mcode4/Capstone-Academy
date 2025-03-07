import './FooterImg.css'
import { useLocation } from 'react-router-dom'

function FooterImg(){
    const location = useLocation().pathname.split('/')[1]
    const locations = ['', 'login', 'signup']
    let classToggle = 'offf'

    locations.forEach(loc=>{
        if(loc === location){
            classToggle = 'onn'
        }
    })

    console.log('FOOTER LOCATION', locations)
    return (
        <div id="footer-img" className={classToggle}>
            <img src="https://my-capstone-proj-bucket.s3.us-east-1.amazonaws.com/footerImg.png" alt="" />
        </div>
    )
}

export default FooterImg