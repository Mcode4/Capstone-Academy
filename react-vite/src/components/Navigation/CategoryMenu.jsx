import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function CategoryMenu(){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
    };

    useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="category-container">
            <div className="nav-button" onClick={toggleMenu}>
            Categories
            </div>
            {showMenu && (
                <div ref={ulRef} className='category-menu'style={{display : showMenu ? 'grid' : 'none'}}>
                    <NavLink to={'/courses/category/coding'}>Coding</NavLink>
                    <NavLink to={'/courses/category/math'}>Math</NavLink>
                    <NavLink to={'/courses/category/science'}>Science</NavLink>
                    <NavLink to={'/courses/category/language'}>Language</NavLink>
                    <NavLink to={'/courses/category/fun'}>Fun</NavLink>
                    <NavLink to={'/home'}>All</NavLink>
                </div>
            )}
        </div>
        
    )
}

export default CategoryMenu