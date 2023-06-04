import React from 'react';
import './App.css';
import Logo from '../assets/logo.png';
import user from '../assets/user.png';
// Navbar component
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-avatar">
        <img src={user} alt="Avatar" />
      </div>
    </nav>
  );
};

export default Navbar;  

