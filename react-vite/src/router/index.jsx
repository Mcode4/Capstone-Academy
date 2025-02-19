import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage';
import CoursePage from '../components/CoursePage';
import CourseCreatorPage from '../components/CourseCreatorPage';

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
      },
      {
        path: "/course/:id",
        element: <CoursePage />,
      },
      {
        path: "/users/:id",
        element: <ProfilePage />,
      },
      {
        path: "/create",
        element: <CourseCreatorPage />,
      },
      {
        path: "/edit/:id",
        element: <CourseCreatorPage />,
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