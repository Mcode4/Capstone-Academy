import { useSelector, useDispatch } from "react-redux";
import FeatureCourseElement from "../../FeatureCourseElement"

function HomePage(){
    const user = useSelector(state => state.session.user)
    
    return(
        <div id="home-page">
            <FeatureCourseElement />
            <FeatureCourseElement />
        </div>
    )
}

export default HomePage