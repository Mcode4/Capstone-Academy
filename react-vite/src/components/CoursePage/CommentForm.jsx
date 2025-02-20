import { useState} from "react"

export default function CommentForm(){
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(null)
    const [err, setErr] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!rating){
            return setErr("Must have a rating")
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
            {err && (<p>{err}</p>)}
            <button type="submit">Post</button>
        </form>
    )
}