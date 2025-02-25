import { useState, useEffect } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { editCourseThunk, loadAllCourses } from "../../redux/courses"


function CourseEditorPage({ isFinished=false, isLoaded=false }){
    const {id} = useParams()
    const course = useSelector(state => state.courses.all)[id]
    console.log('COURSEEE', course)
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState(course?.name)
    const [category, setCategory] = useState(course?.category)
    const [image, setImage] = useState(course?.image)
    const [description, setDescription] = useState(course?.description)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllCourses())
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('owner_id', user.id)
        formData.append('category', category)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image)
        const server = await dispatch(editCourseThunk(formData, id))

        if(server){
            console.log('RETURN ON CREAT COURSE JSX', server)
        } else {

            return (
                <>
                <h1>Course Uploaded!</h1>

                <a href="">go to course</a>
                </>
            )
        }
    }

    return (
        <>
        {isFinished ? (
            <div className="course-editor-page">
                <header className="creator-nav">
                    <button><NavLink to={'/'}>Back to Home</NavLink></button>
                    <button>Add Page Content</button>
                    <button>Delete</button>
                    <button>Save</button>
                    <button>Publish</button>
                </header>

                <div className="main-screen">
                    back arrow 
                    <div className="page-screen"></div>
                    front arrow
                </div>
            </div>
        ):(
            <div className="course-editor-page">
                <form onSubmit={(e)=> handleSubmit(e)}>
                    <label>
                        Course Name
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </label>

                    <select 
                        onChange={(e)=> setCategory(e.target.value)}
                    >
                        Category
                        <option value="CODING">Coding</option>
                        <option value="MATH">Math</option>
                        <option value="SCIENCE">Science</option>
                        <option value="LANGUAGE">Language</option>
                        <option value="FUN">Fun</option>
                    </select>

                    <label>
                        Add an image
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e)=> setImage(e.target.files[0])}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <input 
                            type="text" 
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </label>
                    <button type="submit">Continue</button>
                </form>
                <button><NavLink to={'/'}>Back to Home</NavLink></button>
            </div>
        )}
        </>
    )
}


export default CourseEditorPage