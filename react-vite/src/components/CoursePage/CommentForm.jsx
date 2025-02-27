import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { postCommentThunk } from "../../redux/comments"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"

export default function CommentForm({title}){
    const [comment, setComment] = useState("")
    // const [rating, setRating] = useState(null)
    const [err, setErr] = useState({})
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const id = useParams().id
    console.log('ID', id)
    const {closeModal} = useModal()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setErr({})
        // if(!rating){
        //     return setErr("Must have a rating")
        // }
        if(!user){
            return setErr({
                server: 'No active user detected'
            })
        }
        if(!id){
            return setErr({
                server: 'No active course detected'
            })
        }
        if(comment.length > 125){
            return setErr({
                comment: 'Comment must have 125 characters or less'
            })
        }

        const serverResponse = await dispatch(postCommentThunk({
            owner_id: user.id,
            course_id: id,
            // rating,
            comment
        }))

        if(serverResponse){
            console.log('SERVER RES ON COMMENT CREATE', serverResponse)
            return setErr(serverResponse)
        } else {
            closeModal()
        }
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)} className="form-page">
            {title && ( 
                <div>Leave a comment on {title}</div>
            )}
            {err.server && (<p>{err.server}</p>)}
            <label>
                <input 
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    required
                />
            </label>
            {err.comment && (<p>{err.comment}</p>)}
            {/* <label>
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
            </label> */}
            <button type="submit">Post</button>
        </form>
    )
}