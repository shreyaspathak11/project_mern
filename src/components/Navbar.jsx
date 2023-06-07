import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from '../assets/logo.png';
import axios from 'axios';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// Navbar component
const Navbar = () => {
 
  const [showDropdown, setShowDropdown] = useState(false);

  const [user, setUser] = useState();


  const googleAuth = ({ profileObj }) => {
    axios({
      method: "post",
      url: "/auth/google/signup",
      data: {
        googleId: profileObj.googleId,
        email: profileObj.email,
       
        name: profileObj.name,
      },
    })
      .then((res) => {

        console.log(res.data)
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProfile();
  }, []);

  
  const logOut = () => {
    googleLogout();
    setUser(null);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-title">
        <h1>Mindful Musings</h1>
      </div>

      {/* Login with Google */}
      {user ? (
        <div className="profile-container">
          <img
            src={user.picture}
            alt={user.name}
            className="profile-image"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <ul className="dropdown-menu">
              <li className="dropdown-item">{user.name}</li>
              <li className="dropdown-item" onClick={logOut}>Logout</li>
              <li className="dropdown-item">Profile</li>
            </ul>
          )}
        </div>
      ) : (
        <useGoogleLogin
      clientId="678252387684-lrt3j7dvlqjs81g8sa107qerdp5pked6.apps.googleusercontent.com"
      onSuccess={googleAuth}
      onFailure={googleAuth}
      cookiePolicy={"single_host_origin"}
    >
      <span>Sign Up with Google</span>
    </useGoogleLogin>
      )}
    </nav>
  );
};


export default Navbar;





