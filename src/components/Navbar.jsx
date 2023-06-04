import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from '../assets/logo.png';
import axios from 'axios';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// Navbar component
const Navbar = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
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
      {profile ? (
        
          <div className="profile-container">
            <img src={profile.picture} alt={profile.name} className="profile-image" onClick={toggleDropdown} />
            {showDropdown && (
              <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={logOut}>Logout</li>
                <li className="dropdown-item">Profile</li>
              
              </ul>
            )}
          </div>
        
      ) : (
        <button className="button-profile" onClick={() => login()}>
          Sign in{' '}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
