import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setFeaturedCourses } from "../../redux/courses";
import FeatureCourseElement from "../../FeatureCourseElement"

function HomePage({ isLoaded=false }){
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    
    
    return(
        <>
        {isLoaded && (
            <div id="home-page">
                <FeatureCourseElement />
                <FeatureCourseElement />
            </div>
        )}
        </>
    )
}

export default HomePage