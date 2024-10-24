import React from 'react'
import { useState, useEffect } from 'react';

import './DJSched.css'
const image = require("./wbar-dj-sched.jpg")


  function ShowWithTime({ time, show }) {
    return (
      <div className="show">
        <div className="show-name">{show}</div>
        <div className="time">{time}</div>
      </div>
    );
  }
  
  function DJSched() {
    const [activeDay, setActiveDay] = useState(null);

    const [schedule, setSchedule] = useState({});

    useEffect(() => {
      fetch('http://localhost:5001/api/schedule')
          .then((response) => response.json())
          .then((data) => setSchedule(data))
          .catch((error) => console.error('Error fetching schedule:', error));
    }, []);
  
    const toggleDay = (day) => {
      setActiveDay(activeDay === day ? null : day);
    };
  
    return (
      <div className="container">
        <h1 className="text-center mt-5">DJ Schedule</h1>
        <div className="row justify-content-center">
          {Object.keys(schedule).map((day) => (
            <div key={day} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className={`day ${activeDay === day && 'active'}`} onClick={() => toggleDay(day)}>
                <div className="day-name">{day}</div>
                {activeDay === day && (
                  <div className="schedule">
                    {Object.entries(schedule[day]).map(([time, show]) => (
                      <ShowWithTime key={time} time={time} show={show} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default DJSched;