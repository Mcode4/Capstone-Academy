import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import './ProfilePage.css'

function ProfilePage(isLoaded=false){
    const id = useParams().id
    const users = useSelector(state => state.users.data)
    const loadData = useLoaderData()
    const user = users[id]
    console.log('LOAD DATA', loadData)
    console.log('LOAD DATA @@@@222222', loadData.length)
    return (
        <div id="profile-page">
            {!user ? (
                <h1>404 Page Not Found</h1>
            ):(
                <>
                <div className="user-display">
                    <img className="large-icon" src={`${user.image}`} alt="" />
                    <div className="display-info">
                        <div className="display-names">
                            <h3>{user.first_name} {user.last_name}</h3>
                            <div>@{user.username}</div>
                        </div>
                        <p className="bio">{user.bio} Bio</p>
                    </div>
                    
                </div>
                {/* <div class='featured-container'>
                    @{user.username}'s Courses
                    <div class='featured-course'></div>
                </div> */}
                <label>
                    <h2>{user.first_name}'s Courses</h2>
                    <div className="all-course-display">
                        {loadData[0] === 'error' ? (
                            <p>{loadData[1]}</p>
                        ): loadData.length !== 0 ? (
                            <>
                            {loadData.map(course=>(
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
                            </>
                        ) : (
                            <p>No courses for user</p>
                        )}
                    </div>
                </label>
                </>
            )}
        </div>
    )
}

export default ProfilePage