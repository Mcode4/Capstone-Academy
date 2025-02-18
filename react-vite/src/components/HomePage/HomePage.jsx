import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    if(!user) navigate('/')
    
    return(
        <div id="home-page">
            <div class='featured-container'>
                Featured Courses
                <div class='featured-course'></div>
            </div>
            <div class='featured-container'>
                Recommend Courses
                <div class='featured-course'></div>
            </div>
        </div>
    )
}

export default HomePage