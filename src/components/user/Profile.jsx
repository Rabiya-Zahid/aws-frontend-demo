import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
console.log("UnderlineNav.Item:", UnderlineNav.Item);
console.log("BookIcon:", BookIcon);
console.log("RepoIcon:", RepoIcon);
const  Profile=()=>{
    const   navigate=useNavigate();
    const   [userDetails,setUserDetails]=useState({});
    const {setCurrentUser}=useAuth();
    useEffect(()=>{
        const   fetchUserDetails=async()=>{
            const   userId=localStorage.getItem("userId");
            if(userId){
                try{
        
                  const response=await  axios.get(`http://localhost:3002/userProfile/${userId}`)  ;
                  setUserDetails(response.data) ;   
                }
                catch(err){
                    console.error("Cannot   fetch   user    details:",err);
                }
            }
        }
        fetchUserDetails();
    },[]);
 return (
    <>
      <Navbar />
      
<UnderlineNav aria-label="Repository">
  <Link
    to="/profile"
    className="nav-link"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <BookIcon size={16} />
    Overview
  </Link>

  <Link
    to="/repo"
    className="nav-link"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <RepoIcon size={16} />
    Starred Repositories
  </Link>
</UnderlineNav>


      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export  default Profile;