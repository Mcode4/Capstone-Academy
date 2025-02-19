import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./AccountButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)
  const users = useSelector(state => state.users.users)
  const allState = useSelector(state => console.log('STATE', state))
  const location = useLocation().pathname.split('/')
  useEffect(()=>{
    if(location[1] === 'edit' || location[1] === 'create'){
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'none'
    } else {
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'block'
    }
  })

  return (
    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <li>
    //     <ProfileButton />
    //   </li>
    // </ul>
    <div id="navbar">
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
          <button><NavLink to={"create"}>Create Course</NavLink></button>
          <ProfileButton />
        </div>
      )}
    </div>
  );
}

export default Navigation;
