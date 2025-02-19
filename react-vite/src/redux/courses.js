const LOAD_COURSES = 'courses/loadCourses'
const REMOVE_COURSES = 'courses/removeCourses'

const loadCourses = (courses) =>({
    type: LOAD_COURSES,
    payload: courses
})
const removeCourses = (id) => ({
    type: REMOVE_COURSES,
    payload: id
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

const initialState = {featured: [], all: []}

function courseReducer(state = initialState, action){
    switch (action.type){
        case LOAD_COURSES:
            return {...state, all: action.payload}
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