import { useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import CategoryMenu from "./CategoryMenu";
import "./Navigation.css";

function Navigation() {
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
      <NavLink className="NavLink" to={'/'}>
        <img src="../.././public/images/caLogo1t.png" alt="" />
      </NavLink>
      <div className="right-nav">
        {!user ? (
          <>
            <NavLink className="btn btn-primary" to={'login'}>Log in</NavLink>
            <NavLink className="btn btn-primary" to={'signup'}>Sign up</NavLink>
          </>
        ): (
          <>
            <CategoryMenu />
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
