import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FeatureCourseElement from "../../FeatureCourseElement"
import { loadTopThunk, postReviewThunk } from "../../redux/site-review"
import './LandingPage.css'
function LandingPage(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [err, setErr] = useState({})
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.siteReviews.reviews)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            navigate('/home')
        }
    }, [user])

    useEffect(()=>{
        dispatch(loadTopThunk())
    },[submitted])
    // useEffect(()=>{
    //     dispatch(loadTopThunk())
    // },[])

    const handleSubmit = async(e) => {
        setErr({})
        e.preventDefault()

        if(!rating) return setErr({rating: 'Must give a rating'})

        if(firstName.length > 25){
            return setErr({
                firstName: 'First Name must have 25 characters or less'
            })
        }
        if(lastName.length > 25){
            return setErr({
                lastName: 'Last Name must have 25 characters or less'
            })
        }
        if(review.length > 125){
            return setErr({
                review: 'Review must have 125 characters or less'
            })
        }
        
        const reviewObj = {
            first_name: firstName,
            last_name: lastName,
            review,
            rating
        }
        const server = await dispatch(postReviewThunk(reviewObj))
        if(server){
            console.log('RETURN ON CREAT COURSE JSX', server)
            setErr(server)
        } else {
            setSubmitted(true)
        }
    }

    return (
        <div id="landing-page">

            <div class='header1'>
                <h1>Welcome to Capstone Academy</h1>
                <div className="head-info1">
                    A text-based learning site made for users to learn and share skills.
                    Have an account? <a style={{color: 'blue', textDecoration: 'underline'}} href="login">Login here</a> or <a style={{color: 'blue', textDecoration: 'underline'}} href="signup">Sign up</a>
                </div>
            </div>

            <FeatureCourseElement />

            <div class='featured-container'>
                <h2>Top Reviews</h2>
                <div class='featured-reviews'>
                    {reviews.map(reviewIt=>(
                        <div className="rev-container" key={reviewIt.id}>
                            <div>{reviewIt.firstName} {reviewIt.lastName}</div>
                            <h1 style={{color: 'yellow'}}>{reviewIt.rating}★</h1>
                            {reviewIt.review}
                        </div>
                    ))}
                </div>
            </div>

            {!submitted ?(
                <div class='review-form'>
                    <form className='form-page' onSubmit={handleSubmit}>
                        {err.server && (<p>{err.server}</p>)}
                        <label>
                            First Name*
                            <input 
                                placeholder="First Name"
                                type="text" 
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
                                required
                            />
                            {err.firstName && (<p>{err.firstName}</p>)}
                            Last Name
                            <input 
                                placeholder="Last Name"
                                type="text" 
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}
                            />
                            {err.lastName && (<p>{err.lastName}</p>)}
                        </label>
                        <br />
                        <label htmlFor="rating-slide">
                            Rating*
                            <div className="rating-slide">
                                {[1,2,3,4,5].map(val=>(
                                    <button
                                        key={val}
                                        type="button"
                                        style= {{color : rating >= val ? 'yellow' : 'black'}}
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setRating(val)
                                        }}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </label>
                        <br />
                        {err.rating && (<><p>{err.rating}</p><br /></>)}
                        <label>
                            Review*
                            <input 
                                placeholder="Review"
                                type="text" 
                                value={review}
                                onChange={(e)=> setReview(e.target.value)}
                                required
                            />
                        </label>
                        {err.review && (<p>{err.review}</p>)}
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ):(
                <p>Thank you! Your review was submitted</p>
            )}
        </div>
    )
}

export default LandingPage