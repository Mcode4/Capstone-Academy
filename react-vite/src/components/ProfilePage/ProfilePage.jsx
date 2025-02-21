import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import FeatureCourseElement from "../../FeatureCourseElement"

function ProfilePage(isLoaded=false){
    const id = useParams().id
    const users = useSelector(state => state.users.data)
    // console.log('ID', id)
    const user = users[id]
    let courses

    useEffect(()=>{
        userCourses().then(()=>{
            isLoaded=true
        }).then(()=> console.log('COURSESSSS LOADEDD', courses))
    }, [])

    const userCourses = async()=>{
        const res = await fetch(`/api/courses/${id}`)
        console.log('POINT 1: ', res)
        if(res.ok){
            const data = await res.json()
            console.log('POINT 2: ', data.courses)
            // if(data.courses.length === 0){
            //     return courses = ['No Courses Made']
            // }
            return courses = data.courses
        } else {
            console.log('ERRRRRR WITH USER COURSES')
        }
    }
    return (
        <div id="profile-page">
            {!user ? (
                <h1>404 Page Not Found</h1>
            ):(
                <>
                <div className="user-display">
                    <div className="display-info">
                        <img src={`${user.image}`} alt="" />
                        <div className="display-names">
                            {user.first_name} {user.last_name}
                            @{user.username}
                        </div>
                    </div>
                    {user.bio}
                </div>
                {/* <div class='featured-container'>
                    @{user.username}'s Courses
                    <div class='featured-course'></div>
                </div> */}
                {isLoaded && courses && (
                    <FeatureCourseElement 
                        title={`${user.first_name}'s Courses`}
                        data={courses}
                    />
                )}
                </>
            )}
        </div>
    )
}

export default ProfilePage