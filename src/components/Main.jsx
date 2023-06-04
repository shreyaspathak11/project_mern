import React, { useState } from 'react'
import './App.css';
import { RiSearch2Line } from 'react-icons/ri';
// Main section component
const MainSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

  const handleHover = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };
    return (
      <section className="main-section">
        <div className="description">
          <h1>Welcome to Mindful Musings</h1>
          <p>Share and explore inspiring quotes and thoughts.</p>
        </div>
        
        <div className={`search-bar ${isExpanded ? 'expanded' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
      <input type="text" placeholder="Just Tell me what You need!" />
      <button>
        <RiSearch2Line />
      </button>
    </div>

      </section>
    );
  };
  

export default MainSection