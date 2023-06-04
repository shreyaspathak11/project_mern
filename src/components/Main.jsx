import React from 'react'
import './App.css';
// Main section component
const MainSection = () => {
    return (
      <section className="main-section">
        <div className="description">
          <h1>Welcome to Mindful Musings</h1>
          <p>Share and explore inspiring quotes and thoughts.</p>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
      </section>
    );
  };
  

export default MainSection