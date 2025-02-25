import { useEffect } from "react";
import { useSelector} from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./AccountButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(state => state.session.user)
  const location = useLocation().pathname.split('/')
  let home = user ? '/home' : '/'

  useEffect(()=>{
    if(location[1] === 'edit' || location[1] === 'create'){
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'none'
    } else {
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'flex'
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
        <NavLink to={home}>Home</NavLink>
      </button>
      <div className="right-nav">
        {!user ? (
          <>
            <button><NavLink to={'login'}>Log in</NavLink></button>
            <button><NavLink to={'signup'}>Sign up</NavLink></button>
          </>
        ): (
          <>
            <button>Category</button>
            <button><NavLink to={"create"}>Create Course</NavLink></button>
            <ProfileButton />
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
