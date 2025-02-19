import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeatureCourseElement from "../../FeatureCourseElement"

function HomePage(){
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    if(!user) navigate('/')
    
    return(
        <div id="home-page">
            <FeatureCourseElement />
            <FeatureCourseElement />
        </div>
    )
}

export default HomePage