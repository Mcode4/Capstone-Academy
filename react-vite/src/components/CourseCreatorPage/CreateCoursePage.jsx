import { useState, useEffect } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createCourseThunk } from "../../redux/courses"

function CreateCoursePage(){
    const [name, setName] = useState('')
    const [category, setCategory] = useState('CODING')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [err, setErr] = useState({})
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            return navigate('/home')
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        e.stopPropagation()

        setErr({})

        const body = document.getElementById('root')
        body.style.pointerEvents = 'none'

        if(name.length > 50){
            return setErr({
                name: "Name must be 50 characters or less"
            })
        }
        if(description.length > 250){
            return setErr({
                description: `Description must be 250 characters are less. You have ${description.length}`
            })
        }


        const formData = new FormData()
        formData.append('owner_id', user.id)
        formData.append('category', category)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image)
        const server = await dispatch(createCourseThunk(formData))

        if(server){
            console.log('RETURN ON CREAT COURSE JSX', server)
            body.style.pointerEvents = 'auto'
        } else {
            body.style.pointerEvents = 'auto'
            navigate('/home')
        }
    }

    return (
        <div className="form-page">
            <h1>Create a Course</h1>
            <div className="create-course-page">
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <label>
                        Course Name*
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            required
                        />
                    </label>
                    {err.name && (<p>{err.name}</p>)}
                    <br />
                    <select 
                        onChange={(e)=> setCategory(e.target.value)}
                    >
                        Category*
                        <option value="CODING">Coding</option>
                        <option value="MATH">Math</option>
                        <option value="SCIENCE">Science</option>
                        <option value="LANGUAGE">Language</option>
                        <option value="FUN">Fun</option>
                    </select>
                    <br />
                    <label>
                        Add an image*
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e)=> setImage(e.target.files[0])}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Description*
                        <input 
                            type="text" 
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                    </label>
                    {err.description && (<p>{err.description}</p>)}
                    <br />
                    <button type="submit">Continue</button>
                </form>
                <button><NavLink to={'/'}>Back to Home</NavLink></button>
            </div>
        </div>
        
    )
}

export default CreateCoursePage