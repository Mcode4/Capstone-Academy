// GET ALL USERS
// FOR USERPAGE(PROFILE PAGE)
// Go to user/id

// When Deleting a session user
// Trigger a dispatch for edit all users

// Work Logic to delete user's:
// Courses, Comments, & Notifications
// In backend when user is deleted
// Courses deleted Pages > Pages delete Page Content
// Warning when deleting

const LOAD_USERS = 'user/loadUsers'
const REMOVE_USERS = 'user/removeUsers'

const loadUsers = (users) =>({
    type: LOAD_USERS,
    payload: users
})

const removeUsers = (id) => ({
    type: REMOVE_USERS,
    payload: id
})

export const loadAllUsers = () => async(dispatch) =>{
    const res = await fetch('/api/users')
    console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATA', data)
        dispatch(loadUsers(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR', err)
    }
    else {
        console.log('SOME WENT WRONG ON USER THUNK')
    }
}

const initialState = {users : []}

function userReducer(state = initialState, action){
    switch(action.type){
        case LOAD_USERS:
            return {...state, users: action.payload}
        case REMOVE_USERS:
            return {
                ...state,
                users: state.users.filter(
                    user => user.id !== action.payload
                )
            }
        default:
            return state
    }
}

export default userReducer