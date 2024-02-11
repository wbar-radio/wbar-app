import React from 'react'
import './events.css';
const nextImage = require("./wbar-2.17.jpg")
const pastImage1 = require("./wbar-12.02.png")
const pastImage2 = require("./wbar_apps_due.png")
const pastImage3 = require("./wbar join '23 Flyer (1).png")
const pastImage4 = require("./wbar-april-29.png")

function Events(){
    return(
        <div>
            <div className='bar'>
                <h1 className="bar-title">Next Event:</h1>
            </div>
            <div className="spacer"></div> {/* Add space between divs */}

            <div className="image-container-next">
                <img src={nextImage} className="next-event" alt="next event" style={{ width: '330px', height: '330px' }}/>
            </div>

            <div className="spacer"></div> {/* Add space between divs */}
            <div className='bar'>
                <h1 className="bar-title">Past Events:</h1>
            </div>
            
            <div className="spacer"></div> {/* Add space between divs */}

            <div className="parent-container">
            <div className="image-container-past-1"> 
                <img src={pastImage1} className="past-event-1" 
                alt="past-event-1" style={{ width: '330px', height: '330px' }}/>
            </div>

            <div className="image-container-past-2"> 
                <img src={pastImage2} className="past-event-2" 
                alt="past-event-2" style={{ width: '330px', height: '330px' }}/>
            </div>

            <div className="image-container-past-3"> 
                <img src={pastImage3} className="past-event-3" 
                alt="past-event-3" style={{ width: '330px', height: '330px' }}/>
            </div>

            <div className="image-container-past-4"> 
                <img src={pastImage4} className="past-event-4" 
                alt="past-event-4" style={{ width: '330px', height: '330px' }}/>
            </div>

            </div>
            <div className="spacer"></div> {/* Add space between divs */}
        </div>
    )
}
export default Events