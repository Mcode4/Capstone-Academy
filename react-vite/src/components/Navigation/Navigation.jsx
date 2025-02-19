import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./AccountButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)
  const users = useSelector(state => state.users.users)
  const courses = useSelector(state => state.courses.courses)
  const allState = useSelector(state => console.log('STATE', state))

  

  return (
    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <li>
    //     <ProfileButton />
    //   </li>
    // </ul>
    <div className="navbar">
      <button>
        <NavLink to="/">Home</NavLink>
      </button>
      {!user ? (
        <div className="user-actions">
          <button><NavLink to={'login'}>Log in</NavLink></button>
          <button><NavLink to={'signup'}>Sign up</NavLink></button>
        </div>
      ): (
        <div className="site-actions">
          <button>Category</button>
          <button>Create Course</button>
          <ProfileButton />
        </div>
      )}
    </div>
  );
}

export default Navigation;
