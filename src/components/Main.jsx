import React from 'react'
import './App.css';
import {FaSearch} from 'react-icons/fa' ;
// Main section component
const MainSection = () => {

    return (
      <>
      <section className="main-section">
        <div className="description">
          <h1>Dive into a world of profound wisdom</h1>
          </div>
            <div className="description">
          <p>Share and explore inspiring quotes and thoughts.
        
          </p>
        </div>
       
        <div class="search-container">
  <input class="search" type="search" placeholder="Find it here" />        
  <button className="button"><FaSearch/></button>
</div>
 </section>
        
</>
      
    );
  };
  

export default MainSection