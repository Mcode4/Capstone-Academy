import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage';
import CoursePage from '../components/CoursePage';
import {CourseEditorPage, CreateCoursePage} from '../components/CourseCreatorPage';
import { useDispatch } from 'react-redux';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: async()=>{
          const res = await fetch(`/api/courses`)
          if(!res.ok){
            return ['error', 'Failed to load all courses']
          }
          const data = await res.json()
          return data
        }
      },
      {
        path: "/course/:id",
        element: <CoursePage />
      },
      {
        path: "courses/category/:id",
        element: <HomePage />,
        loader: async({params})=>{
          const res = await fetch(`/api/courses/category/${params.id}`)
          console.log('\n CATEGORY DATA 1111111: ', res, '\n')
          if(res.ok){
            const data = await res.json()
            console.log('\n CATEGORY DATA 2222222: ', data, '\n')
            console.log('TYPEEEEEE', typeof data)
            return data.courses
          }
          return ['error', `Failed to load ${params.id} courses`]
        }
      },
      {
        path: "/users/:id",
        element: <ProfilePage />,
        loader: async({params})=>{
          const res = await fetch(`/api/courses/${params.id}`)
          if(res.ok){
            const data = await res.json()
            console.log('\n CATEGORY DATA 2222222: ', data, '\n')
            console.log('TYPEEEEEE', typeof data)
            return data.courses
          }
          return ['error', `Failed to load user's courses`]
        }
      },
      {
        path: "/create",
        element: <CreateCoursePage />,
      },
      {
        path: "/edit/:id",
        element: <CourseEditorPage />,
      },
      {
        path: "settings",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <h1>404 Page Not Found</h1>,
      },
    ],
  },
]);