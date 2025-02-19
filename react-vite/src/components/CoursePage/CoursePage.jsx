import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"

function CoursePage(){
    const id = useParams().id
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users.data)
    const course = useSelector(state => state.courses.all[id])
    const [err, setErr] = useState('')
    // console.log(course)
    useEffect(()=>{
        if(!course){
            return (
                setErr('404 Page Not Found')
            )
        } else {
            setErr('')
        }
    })
    if(err){
        return (
            <h1>{err}</h1>
        )
    }
    if(!course){
        return (
            <h1>404 Page Not Found</h1>
        )
    }


    return (
        <div className="course-page">
            <header className="course-head">
                <div className="user-course-info">
                    pfp 
                    {users[course.ownerId].first_name} {users[course.ownerId].last_name}
                </div>
                {`${user.id}` === `${course.ownerId}` && (
                    <div className="course-actions">
                        <button><NavLink to={`/edit/${course.id}`}>Edit</NavLink></button>
                        <button>Delete</button>
                    </div>
                )}
            </header>
            <div className="course-img-container">
                <img src={`${course.image}`} alt={course.name} />
            </div>
            <div className="course-full-info">
                <div className="course-top-in">
                    {course.name}
                    {course.rating}
                </div>
                {course.description}
            </div>
            <div className="comment-section"></div>
        </div>
    )
}

export default CoursePage