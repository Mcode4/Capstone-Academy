import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { loadCourseComments, deleteCommentThunk } from "../../redux/comments"
import { loadAllCourses, removeCoursesThunk } from "../../redux/courses"
import CommentForm from "./CommentForm"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import './CoursePage.css'

function CoursePage(){
    const id = useParams().id
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users.data)
    const comments = useSelector(state => state.comments.current)
    const course = useSelector(state => state.courses.all)[id]
    const [err, setErr] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("COMMENTSS", comments)

    useEffect(()=>{
        const loadComments = async () => {
            await dispatch(loadAllCourses())
            await dispatch(loadCourseComments(id))
        }
        if(id){
            loadComments()
        }
    }, [id])

    useEffect(()=>{
        if(!course){
            return (
                setErr('404 Page Not Found')
            )
        } else {
            setErr('')
        }
    })
    if(err){
        return (
            <h1>{err}</h1>
        )
    }
    if(!course){
        return (
            <h1>404 Page Not Found</h1>
        )
    }
    
    const deleteFunc = async(e) => {
        e.preventDefault()

        const server = await dispatch(removeCoursesThunk(id))
        if(server){
            console.log(server)
        } 
        else {
            navigate('/home')
        }
    }
    const deleteCommentFunc = async(e, comId) => {
        e.preventDefault()

        const server = await dispatch(deleteCommentThunk(comId))
        if(server){
            console.log(server)
        }
    }

    const upperCased = (word) => {
        return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
    }
    return (
        <div className="course-page">
            <div className="course-content">
                <header className="course-head">
                    <div className="user-course-info">
                        <img className='medium-icon' src={`${users[course.ownerId]?.image}`} alt="" />
                        <a href={`/users/${course.ownerId}`}>
                            {users[course.ownerId].first_name} {users[course.ownerId].last_name}
                        </a>
                    </div>
                    {`${user?.id}` === `${course.ownerId}` && (
                        <div className="course-actions">
                            <NavLink to={`/edit/${course.id}`}><button>Edit</button></NavLink>
                            <a style={{backgroundColor:'red'}}><button onClick={(e)=> deleteFunc(e)} style={{color:'aliceblue'}}>Delete</button></a>
                        </div>
                    )}
                </header>
                <br />
                <div className="course-img-container">
                    <img className="fit-post" src={`${course?.image}`} alt={course.name} />
                </div>
                <div className="course-full-info">
                    <div className="course-top-info">
                        <h1 className="title-name">{course.name}</h1>
                        {/* {course.rating} */}
                        <h2>Category: {upperCased(course.category)}</h2>
                    </div>
                    {course.description}
                </div>
            </div>
            <div className="comment-section">
                {user && (
                    <OpenModalButton
                        modalComponent={<CommentForm title={course.name} />}
                        buttonText={'Add Comment'}
                    />
                )}
                {comments && comments.map(comment=>(
                    <div className="user-comment" key={comment.id}>
                        <div className="user-comment-info">
                            <img className="icon" src={`${users[comment.ownerId]?.image}`} alt="" />
                            <a style={{color: 'blue', textDecoration: 'underline'}} href={`/users/${comment.ownerId}`}>
                                @{users[comment.ownerId]?.username}
                                
                            </a>
                            <div className="inner-comment">
                                {comment.comment}
                                {user?.id === comment.ownerId && (<button onClick={(e)=> deleteCommentFunc(e, comment.id)}>Delete</button>)}
                            </div>
                            
                        </div>
                        {/* ★{comment.rating} */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CoursePage