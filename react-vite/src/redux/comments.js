const LOAD_COMMENTS = 'comments/loadComments'
const POST_COMMENT = 'comments/postComment'
// ADD A DELETE

const loadComments = (comments) =>({
    type: LOAD_COMMENTS,
    payload: comments
})
const postComment = (comment) =>({
    type: POST_COMMENT,
    payload: comment
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

export const postCommentThunk = (comment) => async(dispatch)=>{
    const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            owner_id: comment.owner_id,
            course_id: comment.course_id,
            rating: comment.rating,
            comment: comment.comment
        })
    })
    console.log('RESSS', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATAAAAAAAAAA2222', data)
        dispatch(postComment(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING USER COMMENTS', err)
        return err
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
        return 'SOME WENT WRONG ON COURSES THUNK'
    }
}

const initialState = { current: [] }

const commentReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOAD_COMMENTS:
            return { ...state, current: action.payload}
        case POST_COMMENT:
            return {...state, current: [...state.current, action.payload]}
        default:
            return state
    }
}

export default commentReducer