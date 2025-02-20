import { useState, useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function CourseEditorPage(){
    const courses = useSelector(state => state.courses.all)
    const {id} = useParams()

    const handleSubmit = async(e) => {}

    return (
        <div className="course-creator-page">
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
    )
}


export default CourseEditorPage