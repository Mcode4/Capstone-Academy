import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import ProfileButton from "./AccountButton";
import "./Navigation.css";

function Navigation() {
  const [listShown, setListShown] = useState(false)
  const user = useSelector(state => state.session.user)
  const location = useLocation().pathname.split('/')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let home = user ? '/home' : '/'

  useEffect(()=>{
    if(location[1] === 'edit' || location[1] === 'create'){
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'none'
    } else {
      const navbar = document.getElementById("navbar")
      navbar.style.display = 'flex'
    }
  }, [location])

  const toggleList = (e) => {
    e.stopPropagation()
    setListShown(!listShown)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
      .then(()=> navigate('/'))
    
  };

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
      <NavLink className="NavLink" to={home}>Home</NavLink>
      <div className="right-nav">
        {!user ? (
          <>
            <NavLink className="NavLink" to={'login'}>Log in</NavLink>
            <NavLink className="NavLink" to={'signup'}>Sign up</NavLink>
          </>
        ): (
          <>
            <div className="category-container">
              <div className="nav-button" onClick={(e)=> toggleList(e)}>
                Categories
              </div>
              <ul style={{display : listShown ? 'block' : 'none'}}>
                  <li>
                    <NavLink>Coding</NavLink>
                  </li>
                  <li>
                    <NavLink>Math</NavLink>
                  </li>
                  <li>
                    <NavLink>Science</NavLink>
                  </li>
                  <li>
                    <NavLink>Language</NavLink>
                  </li>
                  <li>
                    <NavLink>Fun</NavLink>
                  </li>
              </ul>
            </div>
            <NavLink className="NavLink" to={"create"}>Create Course</NavLink>
            <div  className="nav-button two">
            <button onClick={logout} style={{backgroundColor : 'red', color : 'aliceblue', border: 'none'}}>Log Out</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
