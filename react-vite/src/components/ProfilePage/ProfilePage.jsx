import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function ProfilePage(){
    const id = useParams().id
    const users = useSelector(state => state.users.data)
    // console.log('ID', id)
    const user = users[id]
    return (
        <div id="profile-page">
            {!user ? (
                <h1>404 Page Not Found</h1>
            ):(
                <>
                <div className="user-display">
                    <div className="display-info">
                        PFP
                        <div className="display-names">
                            {user.first_name} {user.last_name}
                            @{user.username}
                        </div>
                    </div>
                    {user.bio}
                </div>
                <div class='featured-container'>
                    @{user.username}'s Courses
                    <div class='featured-course'></div>
                </div>
                </>
            )}
        </div>
    )
}

export default ProfilePage