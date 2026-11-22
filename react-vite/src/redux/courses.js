const LOAD_COURSES = 'courses/loadCourses'
const REMOVE_COURSES = 'courses/removeCourses'
const SET_FEATURED = 'courses/setFeatured'
const CREATE_COURSE = 'courses/createCourse'
const EDIT_COURSE = 'courses/editCourse'

const loadCourses = (courses) =>({
    type: LOAD_COURSES,
    payload: courses
})
const removeCourses = (id) => ({
    type: REMOVE_COURSES,
    payload: id
})
const setFeatured = (courses) =>({
    type: SET_FEATURED,
    payload: courses
})
const createCourse = (course) =>({
    type: CREATE_COURSE,
    payload: course
})
const editCourse = (course) => ({
    type: EDIT_COURSE,
    payload: course
})

export const loadAllCourses = () => async(dispatch)=> {
    const res = await fetch('/api/courses')
    if(res.ok){
        const data = await res.json()
        dispatch(loadCourses(data.courses))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON COURSES THUNK')
    }
}

export const setFeaturedCourses = () => async(dispatch) =>{
    const res = await fetch('/api/courses/featured')
    if(res.ok){
        const data = await res.json()
        dispatch(setFeatured(data.courses))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING FEATURED COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON FEATURED COURSES THUNK')
    }
}
export const createCourseThunk = (course) => async(dispatch) =>{
    const res = await fetch('/api/courses', {
        method: 'POST',
        body: course
    })
    if(res.ok){
        const data = await res.json()
        dispatch(createCourse(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        return err
    }
    else {
        const err = await res.json()
        return err
    }
}

export const editCourseThunk = (course, id) => async(dispatch) =>{
    const res = await fetch(`/api/courses/edit/${id}`, {
        method: 'PUT',
        body: course
    })
    if(res.ok){
        const data = await res.json()
        dispatch(editCourse(data))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING EDIT COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON EDIT COURSES THUNK')
    }
}

export const removeCoursesThunk = (id) => async(dispatch) =>{
    const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(removeCourses(id))
    }
    else if(res.status > 500){
        const err = await res.json()
        console.log('ERR FETCHING REMOVE COURSES', err)
    }
    else {
        console.log('SOME WENT WRONG ON REMOVE COURSES THUNK')
    }
}


const initialState = {featured: [], all: {}}

function courseReducer(state = initialState, action){
    switch (action.type){
        case LOAD_COURSES:
            return {...state, all: action.payload}
        case SET_FEATURED:
            return {...state, featured: action.payload}
        case REMOVE_COURSES:
            return {
                ...state,
                all: Object.keys(state.all).filter(
                    course => course !== action.payload
                ),
                featured: state.featured.filter(
                    course => course.id !== action.payload
                )
            }
        case CREATE_COURSE:
            return {...state, all: {...state.all, [action.payload.id]: action.payload}}
        case EDIT_COURSE:

            return {...state, 
                all: {
                    ...state.all,
                    [action.payload.id]: action.payload
                },
                featured: state.featured.map(course => course.id === action.payload.id ? action.payload : course)
            }
        default:
            return state
    }
}

export default courseReducer
