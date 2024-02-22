import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

export default function Login(){

    const [userData, setUserData] = useState({
        username: "",
        userid: "",
        password: "",
        isfaculty: false,
      });
      const Navigate = useNavigate();
    const { setUserId, setUserName ,setIsFaculty  } = useUserContext();
     const handleSubmit = (e) => {
        e.preventDefault();
       
          fetch(process.env.REACT_APP_API_URL +'/login',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then((response) => {
              if (response.status === 201) {
                // Registration was successful
                alert("User Logged successfully")
             
                setUserId(userData.userid);
                setUserName(userData.username);
                setIsFaculty(userData.isfaculty)
                Navigate("/home");
              } else if (response.status === 400) {
                // Validation or bad request error
                response.json().then((data) => {
                  toast.error(data.message);
                  alert(data.userid);
                 
                });
              } else {
                // Login failed, handle the error
                response.json().then((data) => {
                  toast.error(data.message);
                  alert(data.userid);
                });
            
                alert("Failed to Login user. Please try again.");
              }
            })
            .catch((error) => {
        
              alert( "An error occurred while making the request. Please try again.");
            });
       
      };
      return (
        <div className="signup-form">
         <div className="sign2">
            <form className="form-container">
              <div className="inputs">
                <label htmlFor="username">
                  <i className="fa-solid fa-user"></i>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="inputs">
                <label htmlFor="userid">
                  <i className="fa-solid fa-envelope"></i>
                </label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  placeholder="User ID"
                  value={userData.userid}
                  onChange={(e) =>
                    setUserData({ ...userData, userid: e.target.value })
                  }
                />
              </div>
              <div className="inputs">
                <label htmlFor="password">
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                </div>
            
            
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="terms"
                  id="checkbox"
                  checked={userData.terms}
                  onChange={() =>
                    setUserData({ ...userData, isfaculty: !userData.isfaculty })
                  }
                />
                <label htmlFor="checkbox">
                Are you Faculty ?
                </label>
              </div>
            </form>
            <div className="or">
              <button className="btn submit" onClick={handleSubmit}>
                <span>
                  <i className="fa-solid fa-hand-holding-droplet red"></i> Login
                </span>
              </button>
            </div>
            <div className="or checkbox">
              <p>
              Do you want to Register..?(" ")
                <label>
                  <Link to="/signup">Click Here</Link>
                </label>
              </p>
            </div>
          </div>
        </div>
      );
            }
   
    
