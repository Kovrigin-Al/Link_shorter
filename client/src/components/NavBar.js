import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const NavBar = () => {
    const auth = useContext(AuthContext)

    let navigate = useNavigate();
    const logoutHandler = (event) => {

        event.preventDefault(); 
        auth.logout(); 
        navigate("/");
    }
    return (
        <nav>
        <div className="nav-wrapper teal lighten-1 " style={{padding: '0 2rem'}}>
          <span className="brand-logo">Link Shorter</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to='/create'>Create</NavLink></li>
            <li><NavLink to='/links'>Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav> 
    )
}