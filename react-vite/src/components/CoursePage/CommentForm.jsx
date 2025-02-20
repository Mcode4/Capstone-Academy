import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { postCommentThunk } from "../../redux/comments"
import { useParams } from "react-router-dom"

export default function CommentForm(){
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(null)
    const [err, setErr] = useState("")
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const id = useParams().id
    console.log('ID', id)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!rating){
            return setErr("Must have a rating")
        }

        const serverResponse = await dispatch(postCommentThunk({
            owner_id: user.id,
            course_id: id,
            rating,
            comment
        }))

        if(serverResponse){
            return setErr(`${serverResponse}`)
        }
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>
                <input 
                    type="text"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    required
                />
            </label>
            <label>
                Rating*
                <div className="rating-holder">
                    {[1,2,3,4,5].map(val=>(
                        <button 
                            key={val}
                            type="button"
                            style={{ color: rating >= val ? 'yellow' : 'black'}}
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
            {err && (<p style={{ color: 'red'}}>{err}</p>)}
            <button type="submit">Post</button>
        </form>
    )
}