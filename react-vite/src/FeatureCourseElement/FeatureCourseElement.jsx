import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import { setFeaturedCourses } from "../redux/courses"

function FeatureCourseElement({ data, title}){
    const featureCourses = useSelector(state=> state.courses.featured)
    const users = useSelector(state => state.users.data)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setFeaturedCourses())
    })

    console.log('DATAA FOR FEATURE', data)
    return (
        <div class='featured-container'>
            {title ? title : 'Featured Courses'}
            {data ? (
                <div class='featured-course'>
                    {Array.isArray(data) && data.length > 0 && (
                        data.map((course) => (
                            <div key={course.id}>
                                <NavLink to={`/course/${course.id}`}>
                                    <img src={`${course.image}`} alt={course.name} />
                                    <div className="course-info">
                                        {course.name}
                                        {course.rating}
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
                            <div key={course.id}>
                                <div className="course-owner">
                                    <img src={`${users[course.ownerId]?.image}`} alt="" />
                                    {users[course.ownerId]?.first_name} {users[course.ownerId]?.last_name}
                                </div>
                                <NavLink to={`/course/${course.id}`}>
                                    <img src={`${course.image}`} alt={course.name} />
                                    <div className="course-info">
                                        {course.name}
                                        {course.rating}
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