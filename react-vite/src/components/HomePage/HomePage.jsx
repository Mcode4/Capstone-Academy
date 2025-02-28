import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import FeatureCourseElement from "../../FeatureCourseElement"
import './HomePage.css'

function HomePage(){
    const user = useSelector(state => state.session.user)
    const courseObj = useSelector(state => state.courses.all)
    let loadData = useLoaderData()

    if(typeof loadData.courses === 'object'){
        console.log('TRRRRUUUUEUEEEEEE', loadData)
        const course = loadData.courses
        let courses=[]
        Object.keys(course).forEach(key =>{
            courses.push(course[key])
            console.log(`KEY: ${key}, DATA: ${course[key]}`)
        })
        loadData = courses
    }
    

    
    return(
        <div id="home-page">
            <FeatureCourseElement />
            <label>
                <h2>All Courses</h2>
                <div className="all-course-display">
                    {loadData[0] === 'error' ? (
                        <p>{loadData[1]}</p>
                    ): loadData.map(course=>(
                        <div key={course.id} className="course-display-2">
                            <NavLink to={`/course/${course.id}`}>
                                <img className="post" src={`${course.image}`} alt={course.name} />
                                <div className="course-info">
                                    {course.name}
                                    {/* {course.rating} */}
                                </div>
                            </NavLink>
                        </div>
                    ))}
            </div>
            </label>
        </div>
    )
}

export default HomePage