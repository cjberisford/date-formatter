import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react"
import WeekDay from "./WeekDay";

export default function WeekDays( { currentDay, weekDayNames, weekDayOrder, openingTimes } ) {

  // Create empty lists for each weekday to init state variable (allows multiple events per day)
  const eventsByDay = weekDayNames.reduce(function(result, item) {
    result[item] = []
    return result
  }, {})
  const [events, setEventsByDay] = useState(eventsByDay)
  const [hasError, setHasError] = useState(false)
  class EventException {
    constructor(message) {
      this.message = message;
      this.name = "EventException";
    }
  }

  function processUserData(data) {

    // Loop through input data - extract each opening/closing event and add to event array
    const events = []
    Object.keys(openingTimes).forEach(key => {
      data[key].forEach(event => {
        const dayNumber = weekDayNames.indexOf(key)
        const order = (dayNumber * 84600) + event.value
        const timeISO = new Date(event.value * 1000)
        const timeFormatted = timeISO.toLocaleString('en-UK', { hour: 'numeric', hour12: true })
  
        events.push({...event, value: timeFormatted, order: order, day: key})
      })
    })
    events.sort((a, b) => a.order > b.order ? 1 : -1)

    // Validate events - there are a couple of other cases that could be added here
    const openEvents = events.filter(event => event.type === "open").length;
    const closeEvents = events.filter(event => event.type === "close").length;
    if (openEvents !== closeEvents) {
      throw new EventException("Each opening event must have a matching close event.")
    }

    // For each opening event, find the next 
    events.forEach((value, index, array) => {
      if (value.type === 'open') {
        let closeAt = array[0]
        if (index !== array.length-1) {
          closeAt = array[index + 1]
        }
        // Next event must be a close event, else data invalid
        if (closeAt.type !== 'close') {
          throw new EventException("Not allowed consecutive open/close events.")
        }

        // Catch equal opening and closing times
        if (closeAt.value === value.value) {
          throw new EventException("Opening and closing times must be different.")
        }

        // Add day to closing time if >24 hrs
        if (Math.abs(closeAt.order - value.order) > 84600) {
          closeAt.value = closeAt.value + " ("+closeAt.day.charAt(0).toUpperCase() + closeAt.day.slice(1) +")"
        }

        const eventObject = {openAt: value.value, closeAt: closeAt.value}
        eventsByDay[value.day].push(eventObject)
      }
    })       
    setEventsByDay(prevState => ({ ...prevState, eventsByDay}))
  }

  useEffect(() => {
    try {
      processUserData(openingTimes)
    } catch(e) {
      console.log(e.name, e.message)
      setHasError(true)
    }
  } // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  if (hasError) {
    return (
      <div className="alert alert-danger" role="alert">
        The user data contains an error. Please check log for details.
      </div>
    )
  }
  else {
    return (
      weekDayOrder.map(weekday => {
        const dayToRender = weekDayNames[weekday]
        return <WeekDay key={uuidv4()} currentDay={currentDay} dayName={dayToRender} dayNames={weekDayNames} events={events[dayToRender]} />
      })
    )
  }
}
