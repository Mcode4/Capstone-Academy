import { useState, useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function CreateCoursePage(){
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log({
            name,
            category,
            image,
            description
        })

    }

    return (
        <div className="create-course-page">
            <form onSubmit={(e)=> handleSubmit(e)}>
                <label>
                    Course Name
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </label>

                <select onChange={(e)=> setCategory(e.target.value)}>
                    Category
                    <option value="CODING">Coding</option>
                    <option value="MATH">Math</option>
                    <option value="SCIENCE">Science</option>
                    <option value="LANGUAGE">Language</option>
                    <option value="FUN">Fun</option>
                </select>

                <button type="file">
                    Add an image
                </button>

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
    )
}

export default CreateCoursePage