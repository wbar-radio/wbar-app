import React from 'react'
import "../title.css"
import { Link } from 'react-router-dom';


function Title() {
  return (
    <div className="Title">
      <h1>WBAR</h1>

      <div style={{ display: "flex" }}>
        {/* Use Link to navigate to the Home route */}
        <Link to="/">
          <button style={{ marginRight: "auto" }}>
            Home
          </button>
        </Link>

        {/* Use Link to navigate to the "/test" route */}
        <Link to="/test">
          <button style={{ marginLeft: "auto" }}>
            DJ Schedule
          </button>
        </Link>
      </div>
    </div>
    
  )

}

export default Title