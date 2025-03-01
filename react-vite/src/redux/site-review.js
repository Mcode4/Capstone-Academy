const LOAD_TOP_REVIEWS = 'site-review/loadTopReviews'
const POST_REVIEW = 'site-review/postReview'

const loadTopReviews = (reviews) => ({
    type: LOAD_TOP_REVIEWS,
    payload: reviews
})
const postReview = (review) => ({
    type: POST_REVIEW,
    payload: review
})

export const loadTopThunk = () => async(dispatch) =>{
    const res = await fetch('/api/site-reviews/highest')
    console.log('RESSS', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATTAAA', data)
        dispatch(loadTopReviews(data.siteReviews))
    }
    else if(res.status < 500){
        const err = await res.json()
        console.log('ERR FETCHING REMOVE COURSES', err)
        return err
    }
    else {
        console.log('SOME WENT WRONG ON REMOVE COURSES THUNK')
        return {server: 'Something went wrong in server, please try again'}
    }
}

export const postReviewThunk = (review) => async(dispatch) =>{
    const res = await fetch('/api/site-reviews', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(review)
    })
    console.log('RESSS', res)
    if(res.ok){
        const data = await res.json()
        console.log('DATTAAA', data)
        dispatch(postReview(data.siteReview))
    }
    else if(res.status < 500){
        const err = await res.json()
        console.log('ERR FETCHING REMOVE COURSES', err)
        return err
    }
    else {
        console.log('SOME WENT WRONG ON REMOVE COURSES THUNK')
        return {server: 'Something went wrong in server, please try again'}
    }
}

const initialState = {reviews: []}

function siteReviewReducer(state=initialState, action){
    switch(action.type){
        case LOAD_TOP_REVIEWS:
            return {...state, reviews: action.payload}
        case POST_REVIEW:
            let check = false
            const updatedReviews = state.reviews.map(review =>{
                if(!check && review.rating <= action.payload.rating){
                    check = true
                    return action.payload
                }
                return review
            })
            return {...state, reviews: updatedReviews}
        default:
            return state
    }
}

export default siteReviewReducer