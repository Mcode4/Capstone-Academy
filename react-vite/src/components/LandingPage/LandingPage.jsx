import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FeatureCourseElement from "../../FeatureCourseElement"

function LandingPage(){
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [review, setReview] = useState("")
    // const [rating, setRating] = useState(null)
    // const [ratingErr, setRatingErr] = useState()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            navigate('/home')
        }
    })

    // const handleSubmit = async(e) => {
    //     e.preventDefault()

    //     if(!rating) return setRatingErr('Must give a rating')
    //     console.log({
    //         firstName,
    //         lastName,
    //         review,
    //         rating
    //     })

    // }

    return (
        <div id="landing-page">

            <div class='header1'>
                <h1>Welcome to Capstone Academy</h1>
                <div className="head-info1">
                    A text-based learning site made for users to learn and share skills.
                    Have an account? <a href="login">Login here</a> or <a href="signup">Sign up</a>
                </div>
            </div>

            <FeatureCourseElement />

            {/* <div class='featured-container'>
                Top Reviews
                <div class='featured-reviews'></div>
            </div> */}

            {/* <div class='review-form'>
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <label>
                        First Name*
                        <input 
                            placeholder="First Name"
                            type="text" 
                            value={firstName}
                            onChange={(e)=> setFirstName(e.target.value)}
                            required
                        />
                        Last Name
                        <input 
                            placeholder="Last Name"
                            type="text" 
                            value={lastName}
                            onChange={(e)=> setLastName(e.target.value)}
                        />
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
                    {ratingErr && (<><p style={{color: 'red'}}>{ratingErr}</p><br /></>)}
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
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div> */}
        </div>
    )
}

export default LandingPage