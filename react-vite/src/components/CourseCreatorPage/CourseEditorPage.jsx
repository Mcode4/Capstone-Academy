// import { useState, useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

function CourseEditorPage({ isFinished=false }){
    const courses = useSelector(state => state.courses.all)
    const user = useSelector(state => state.session.user)
    // const {id} = useParams()

    // const handleSubmit = async(e) => {}

    return (
        <>
        {isFinished ? (
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
        ):(
            <h1>Feature coming soon!</h1>
        )}
        </>
    )
}


export default CourseEditorPage