import  React   from    "react";
import  {Link}  from "react-router-dom"  ;
import logo from "../assets/test.svg";
import  "./navbar.css";
const   Navbar=()=>{
    return(
        <nav>
            <Link to="/">
            <div>
                <img src={logo} alt="Logo" />  
                <h3>Github</h3>
            </div>
            </Link>
            <div>
                <Link   to="/create">
                <p>Create   a   Repository</p>

                </Link>
                <Link   to="/profile">
                <p>Profile</p>
                </Link>
            </div>
        </nav>
    )
}
export  default Navbar;