import React from 'react'
import { useState, useEffect } from 'react';

import './DJSched.css'
const image = require("./wbar-dj-sched.jpg")
const schedule = {
    Sunday: {
      '12AM-2AM': 'TotNite w/Ashley and Grace',
      '2AM-4AM': 'Sound and Meaning',
      '6AM-8AM': 'Hyperfolkxation',
      '8AM-10AM': 'Songbird',
      '10AM-12PM': 'Atonal Salad for Lunch',
      '12PM-2PM': 'lo library sinkhole',
      '2PM-4PM': 'no hoes radio',
      '4PM-6PM': 'flick the beat',
      '6PM-8PM': 'unstructured noise',
      '8PM-10PM': 'Adventures in (Black) Sonic Imaginaries',
      '10PM-12AM': 'Shabash, Bualadh Bos'
    },
    Monday: {
      '12AM-2AM': 'pompia',
      '2AM-4AM': 'Indo-western with Ri',
      '6AM-8AM': 'Shouldv\'ve Been a 70s Baby',
      '8AM-10AM': ' Wombspace',
      '10AM-12PM': 'Sound Diaries',
      '12PM-2PM': 'Normal Music',
      '2PM-4PM': 'Garden Club of Babylon',
      '4PM-6PM': 'timepool',
      '6PM-8PM': 'Tajh\'s show',
      '8PM-10PM': 'Nefika Adena',
      '10PM-12AM': 'Breast and Eggs'
    },
    Tuesday: {
      '12AM-2AM': 'Flo-Rida Man: Florida\'s Wackiest People and Best Music',
      '2AM-4AM': 'Euphoric Summer',
      '6AM-8AM': 'Janky Jukebox',
      '8AM-10AM': 'We Fit Together Walking',
      '10AM-12PM': 'Well, yes!',
      '12PM-2PM': 'High society',
      '2PM-4PM': 's^2 speaks',
      '4PM-6PM': 'Olio: A Miscellaneous Collection',
      '6PM-8PM': 'Meg\'s show',
      '8PM-10PM': 'Techno, Buddhism, Counterculture',
      '10PM-12AM': 'Hypergravity'
    },
    Wednesday: {
      '12AM-2AM': 'saintsteph4nie\'s Chapel',
      '2AM-4AM': 'Structure Antonym',
      '6AM-8AM': 'Alphabet Soup',
      '8AM-10AM': 'Book Club',
      '10AM-12PM': 'The Dyke Den',
      '12PM-2PM': 'Banger? I hardly know her!',
      '2PM-4PM': 'The Worker Drones',
      '4PM-6PM': 'Isis\'s show',
      '6PM-8PM': 'OFFICE HOURS',
      '8PM-10PM': 'cafecito',
      '10PM-12AM': 'H!ICO (Help! I\'m Chronically Online)'
    },
    Thursday: {
      '12AM-2AM': 'Electronika',
      '2AM-4AM': 'On Rhythms',
      '6AM-8AM': 'Bicoastal Baddie',
      '8AM-10AM': 'West Coast Cowboy',
      '10AM-12PM': 'HALO HALO',
      '12PM-2PM': 'punk as folk',
      '2PM-4PM': 'Graybles with and for Friends',
      '4PM-6PM': 'Geolocationism',
      '6PM-8PM': 'Zoe\'s show',
      '8PM-10PM': 'F**k Money Get B*****s',
      '10PM-12AM': 'Rhythm in Flux'
    },
    Friday: {
      '12AM-2AM': 'DJ CHINA HEAVEN',
      '2AM-4AM': 'Winter fever dream',
      '6AM-8AM': 'worldlist',
      '8AM-10AM': 'Are You Still Watching?',
      '10AM-12PM': 'Beans from the can',
      '12PM-2PM': 'gulf',
      '2PM-4PM': 'Steel spiel',
      '4PM-6PM': 'Manifest-Station',
      '6PM-8PM': 'De Profundis: Music is the Journey',
      '8PM-10PM': 'The Slavgaze Special',
      '10PM-12AM': 'girls only domino club'
    },
    Saturday: {
      '12AM-2AM': 'Edging on the air',
      '2AM-4AM': 'Regicide Radio',
      '6AM-8AM': 'Jojo flows', 
      '8AM-10AM': 'she sleeps with you and she prays for me',
      '10AM-12PM': 'POST PUNK DIASPORA',
      '12PM-2PM': 'Ellie and Piper have spoken',
      '2PM-4PM': 'AFRIXA',
      '4PM-6PM': 'yur mum\'s house',
      '6PM-8PM': 'WBARCH Madness',
      '8PM-10PM': 'Blood&Bubblegum',
      '10PM-12AM': 'Holiday at Columbia'
    }
  };
  

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