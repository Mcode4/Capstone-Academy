import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


function FeatureCourseElement({ data, title }){
    const featureCourses = useSelector(state=> state.courses.featured)
    const users = useSelector(state => state.users.data)

    return (
        <div class='featured-container'>
            {title ? title : 'Featured Courses'}
            {data ? (
                <div class='featured-course'></div>
                ):(
                <div class='featured-course'>
                    {Array.isArray(featureCourses) && featureCourses.length > 0 ? (
                        featureCourses.map((course) => (
                            <NavLink key={course.id} to={`/course/${course.id}`}>
                                <div className="course-owner">
                                    pfp
                                    {users[course.ownerId]?.first_name} {users[course.ownerId]?.last_name}
                                </div>
                                <img src={`${course.image}`} alt={course.name} />
                                <div className="course-info">
                                    {course.name}
                                    {course.rating}
                                </div>
                            </NavLink>
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