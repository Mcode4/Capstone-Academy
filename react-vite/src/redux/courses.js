const LOAD_COURSES = 'courses/loadCourses'
const REMOVE_COURSES = 'courses/removeCourses'
const SET_FEATURED = 'courses/setFeatured'

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

export const loadAllCourses = () => async(dispatch)=> {
    const res = await fetch('/api/courses')
    // console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        // console.log('DATA', data)
        // console.log('DATA@@@@', data.courses)
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

const initialState = {featured: {}, all: {}}

function courseReducer(state = initialState, action){
    switch (action.type){
        case LOAD_COURSES:
            return {...state, all: action.payload}
        case SET_FEATURED:
            return {...state, featured: action.payload}
        case REMOVE_COURSES:
            return {
                ...state,
                all: state.all.filter(
                    course => course.id !== action.payload
                ),
                featured: state.featured.filter(
                    course => course.id !== action.payload
                )
            }
        default:
            return state
    }
}

export default courseReducer