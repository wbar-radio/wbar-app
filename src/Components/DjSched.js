import React from 'react'
import './DJSched.css';
const image = require("./wbar-dj-sched.jpg")

function DJSched(){
    return(
        <div>
            {/* Add space between divs */}
            <div className="spacer"></div>
            <div className="image-container">
                <img src={image} alt="dj schedule" style={{ width: '550px', height: '600px' }}/>
            </div>
            <div className="spacer"></div>
        </div>
    )
}
export default DJSched