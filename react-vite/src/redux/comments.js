const LOAD_COMMENTS = 'comments/loadComments'

const loadComments = (comments) =>({
    type: LOAD_COMMENTS,
    payload: comments
})

export const loadCourseComments = (id) => async(dispatch)=>{
    const res = await fetch(`/api/comments/course/${id}`)
    if(res.ok){
        const data = await res.json()
        dispatch(loadComments(data.comments))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING COURSE COMMENTS', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}
export const loadUserComments = (id) => async(dispatch)=>{
    const res = await fetch(`/api/comments/user/${id}`)
    if(res.ok){
        const data = await res.json()
        console.log('DATAAAAAAAAAA2222', data)
        dispatch(loadComments(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING USER COMMENTS', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}

const initialState = { current: [] }

const commentReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOAD_COMMENTS:
            return { ...state, current: action.payload}
        default:
            return state
    }
}

export default commentReducer