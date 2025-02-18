import { useSelector } from "react-redux"

function ProfilePage(){
    const user = useSelector(state => state.session.user)
    console.log('USER', user)
    return (
        <div id="profile-page">
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
        </div>
    )
}

export default ProfilePage