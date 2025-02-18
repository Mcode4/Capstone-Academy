import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function LandingPage(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(null)
    const [ratingErr, setRatingErr] = useState()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    if(user){
        navigate('/home')
    }

    useEffect(()=>{
        setRatingErr('')
        const button = document.getElementsByClassName("rbutton")
        for(let i=0; i< button.length; i++){
            if(i < rating) button[i].style.color = 'yellow'
            else button[i].style.color = 'black'
            
        }
    }, [rating])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!rating) return setRatingErr('Must give a rating')
        console.log({
            firstName,
            lastName,
            review,
            rating
        })

    }

    return (
        <div id="landing-page">

            <div class='header1'>
                <h1>Welcome to Capstone Academy</h1>
                <div className="head-info1">
                    A text-based learning site made for users to learn and share skills.
                    Have an account? <a href="login">Login here</a> or <a href="signup">Sign up</a>
                </div>
            </div>

            <div class='featured-container'>
                Featured Courses
                <div class='featured-course'></div>
            </div>

            <div class='featured-container'>
                Top Reviews
                <div class='featured-reviews'></div>
            </div>

            <div class='review-form'>
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
                            <button 
                                className="rbutton"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    setRating(1)
                                }}
                            >★</button>
                            <button 
                                className="rbutton"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    setRating(2)
                                }}
                            >★</button>
                            <button 
                                className="rbutton"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    setRating(3)
                                }}
                            >★</button>
                            <button 
                                className="rbutton"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    setRating(4)
                                }}
                            >★</button>
                            <button 
                                className="rbutton"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    setRating(5)
                                }}
                            >★</button>
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
            </div>
        </div>
    )
}

export default LandingPage