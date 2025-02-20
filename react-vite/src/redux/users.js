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
    // console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        // console.log('DATA', data)
        // console.log('DATA222', data.users)
        dispatch(loadUsers(data.users))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING USERS', err)
    }
    else {
        console.log('SOME WENT WRONG ON USERS THUNK')
    }
}

const initialState = {data : {}}

function userReducer(state = initialState, action){
    switch(action.type){
        case LOAD_USERS:
            return {...state, data: action.payload}
        case REMOVE_USERS:
            return {
                ...state,
                data: state.data.filter(
                    user => user.id !== action.payload
                )
            }
        default:
            return state
    }
}

export default userReducer