import React from 'react'
import OpeningTimes from "./OpeningTimes";
import { useState, useEffect } from "react"

export default function WeekDay({ currentDay, dayName, dayNames, events}) {

  const [today, setToday] = useState(false)

  // Check on render if dayName is current day
  useEffect( () => {
    if (dayName === currentDay) setToday(true) 
  } // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button className={"accordion-button " + (today ? "" : "collapsed")} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + dayName} aria-expanded="true" aria-controls={"collapse" + dayName} >
          {dayName}
        </button>
      </h2>
    <div id={"collapse" + dayName} 
      className={"accordion-collapse collapse " + (today ? "show" : "")} aria-labelledby="heading{dayName}" data-bs-parent="#weekdaysAccordion">
      <div className="accordion-body">
        <OpeningTimes events={events} />
      </div>
    </div>
  </div>
  )
}
