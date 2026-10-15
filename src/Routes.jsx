import React,{  useEffect   } from "react";
import  {useNavigate,useRoutes} from    "react-router-dom";

import  Dashboard   from    "./components/dashboard/Dashboard";
import Profile  from    "./components/user/Profile";
import  Login   from    "./components/auth/Login.jsx"
import  Signup  from    "./components/auth/Signup.jsx"
import CreateRepository from "./components/repo/CreateRepo.jsx";
import  {useAuth}   from    "./authContext.jsx"
const   ProjectRoutes=()=>{
    const   {currentUser,setCurrentUser}=useAuth();
    const   navigate=useNavigate();

    useEffect(()=>{
        const   userIdFromStorage=localStorage.getItem("userId");
        if(userIdFromStorage    &&  !currentUser){
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage   &&  !["/auth","/signup"].includes(window.location.pathname)){
            navigate("/auth")
        }
        if(userIdFromStorage && window.location.pathname=='/auth'   ){
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);
    let element=useRoutes([
        {
            path:"/",
            element:<Dashboard></Dashboard>
        },
        {
            path:"/auth",
            element:<Login></Login>
        },
        {
            path:"/signup",
            element:<Signup></Signup>
        },
        {
            path:"/profile",
            element:<Profile></Profile>
        },
        {
            path:"/create",
            element:<CreateRepository></CreateRepository>
        },

    ]);
    return  element;
}
export  default ProjectRoutes;
