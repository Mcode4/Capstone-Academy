const LOAD_PAGES = 'pages/loadPages'
const REMOVE_PAGE = 'pages/removePage'
const CREATE_PAGE = 'pages/createPage'

const loadPages = (pages) =>({
    type: LOAD_PAGES,
    payload: pages
})
const removePage = (id) =>({
    type: REMOVE_PAGE,
    payload: id
})
const createPage = (page) =>({
    type: CREATE_PAGE,
    payload: page
})

export const loadPagesThunk = (course_id) => async(dispatch) =>{
    const res = await fetch(`/api/pages/course/${course_id}`)
    console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATA', data)
        dispatch(loadPages(data.pages))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}

export const removePageThunk = (id) => async(dispatch) =>{
    const res = await fetch(`/api/pages/${id}`,{
        method: "DELETE"
    })
    console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATA', data)
        dispatch(removePage(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}

export const createPageThunk = (id) => async(dispatch) =>{
    const res = await fetch(`/api/pages/${id}`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(id)
    })
    console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATA', data)
        dispatch(createPage(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}

const initialState = { data: [] }

const pageReducer = (state=initialState, action) => {
    switch(action.type){
        case LOAD_PAGES:
            return {...state, data: action.payload}
        case REMOVE_PAGE:
            return {...state, data: state.data.filter(
                page => page.id !== action.payload
            )}
        case CREATE_PAGE:
            return {...state, data: [...state.data, action.payload]}
        default:
            return state
    }
}

export default pageReducer