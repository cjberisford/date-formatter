import React from 'react'
import OpeningTimes from "./OpeningTimes";

export default function WeekDay({ dayName, events}) {

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const current = new Date().getDay()

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button className={"accordion-button " + (dayName === weekDays[current] ? "" : "collapsed")} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + dayName} aria-expanded="true" aria-controls={"collapse" + dayName} >
          {dayName}
        </button>
      </h2>
    <div id={"collapse" + dayName} 
      className={"accordion-collapse collapse " + (dayName === weekDays[current] ? "show" : "")} aria-labelledby="heading{dayName}" data-bs-parent="#weekdaysAccordion">
      <div className="accordion-body">
        <OpeningTimes events={events} />
      </div>
    </div>
  </div>
  )
}
