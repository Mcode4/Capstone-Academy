import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import { setFeaturedCourses } from "../redux/courses"
import './FeatureCourseElement.css'

function FeatureCourseElement({ data, title}){
    const featureCourses = useSelector(state=> state.courses.featured)
    const users = useSelector(state => state.users.data)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setFeaturedCourses())
    }, [dispatch])

    console.log('DATAA FOR FEATURE', data)
    return (
        <div class='featured-container'>
            {title ? (<h2>{title}</h2>) : (<h2>Featured Courses</h2>)}
            {data ? (
                <div class='featured-course'>
                    {Array.isArray(data) && data.length > 0 && (
                        data.map((course) => (
                            <div key={course.id} className="course-display">
                                <NavLink to={`/course/${course.id}`}>
                                    <img className="post" src={`${course.image}`} alt={course.name} />
                                    <div className="course-info">
                                        {course.name}
                                        {/* {course.rating} */}
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    )}
                </div>
                ):(
                <div class='featured-course'>
                    {Array.isArray(featureCourses) && featureCourses.length > 0 ? (
                        featureCourses.map((course) => (
                            <div key={course.id} className="course-display">
                                <div className="course-owner">
                                    <img className="icon" src={`${users[course.ownerId]?.image}`} alt="" />
                                    {users[course.ownerId]?.first_name} {users[course.ownerId]?.last_name}
                                </div>
                                <NavLink to={`/course/${course.id}`}>
                                    <img className="post" src={`${course.image}`} alt={course.name} />
                                    <div className="course-info">
                                        {course.name}
                                        {/* {course.rating} */}
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    ) : (
                        <p>No featured courses available</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default FeatureCourseElement