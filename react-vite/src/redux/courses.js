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
    console.log('RESPONSE', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATA', data)
        dispatch(loadCourses(data))
    }
    return
}

const initialState = {courses: [], featuredCourses: []}

function courseReducer(state = initialState, action){
    switch (action.type){
        case LOAD_COURSES:
            return {...state, courses: [action.payload]}
        case REMOVE_COURSES:
            return {
                ...state,
                courses: state.courses.filter(
                    course => course.id !== action.payload
                )
            }
        default:
            return state
    }
}

export default courseReducer