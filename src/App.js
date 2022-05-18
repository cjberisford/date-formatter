
import userData from "./data/userData"
import WeekDays from './components/WeekDays'
import { useState, useEffect } from "react"
import DisplayError from "./components/DisplayError";

const App = () => {
  const timeZone = 'GMT'
  const weekDayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const weekDayOrder = [ 0, 1, 2, 3, 4, 5, 6 ] // Change order/remove days 0=Sunday, 6=Saturday
  const currentDayName = weekDayNames[new Date().getDay()]

  // Create empty lists for each weekday to init state variable (allows multiple events per day)
  const eventsByDay = weekDayNames.reduce(function(result, item) {
    result[item] = []
    return result
  }, {})
  const [events, setEventsByDay] = useState(eventsByDay)
  const [error, setError] = useState(false)
  class EventException {
    constructor(message) {
      this.message = message;
      this.name = "EventException";
    }
  }

  function convertTime(seconds) {
    const timeISO = new Date(seconds * 1000)
    console.log(seconds)
    console.log(timeISO)

    const timeFormatted = timeISO.toLocaleString('en-UK', { hour: 'numeric', hour12: true })
    console.log(timeFormatted)
    return timeFormatted
  }

  function validateEventData(events) {
    // Validate events - there are a couple of other cases that could be added here
    const openEvents = events.filter(event => event.type === "open").length;
    const closeEvents = events.filter(event => event.type === "close").length;
    if (openEvents !== closeEvents) {
      throw new EventException("Unequal number of open and close events in source data. Output may not display correctly.")
    }
  }
  
  function processUserData(data) {
    // Loop through input data - extract each opening/closing event and add to event array
    const events = []
    Object.keys(data).forEach(key => {
      data[key].forEach(event => {
        const dayNumber = weekDayNames.indexOf(key)
        const order = (dayNumber * 86400) + event.value
        const time = convertTime(event.value)
      
        events.push({...event, value: time, order: order, day: key})
      })
    })
    events.sort((a, b) => a.order > b.order ? 1 : -1)

    // Validate user data
    try {
      validateEventData(events)
    } catch(e) {
      console.log(e.name, e.message)
      setError(e.message)
    }

    // For each opening event, find the next close event
    events.forEach((value, index, array) => {
      if (value.type === 'open') {
        let closeAt = array[0]
        if (index !== array.length-1) {

          // Iterate until next 'close' event found
          let matchFound = false
          let i = 0
          while (!matchFound) {
            i++
            if (array[index + i].type === "close") {
              matchFound=true
            }
          }
          closeAt = array[index + i]
        }
        
        // // Next event must be a close event, else data invalid
        // if (closeAt.type !== 'close') {
        //   throw new EventException("Not allowed consecutive open/close events.")
        // }

        // // Catch equal opening and closing times
        // if (closeAt.value === value.value) {
        //   throw new EventException("Opening and closing times must be different.")
        // }

        // Add day to closing time if >24 hrs
        if (Math.abs(closeAt.order - value.order) > 86400) {
          console.log(Math.abs(closeAt.order - value.order))
          closeAt.value = closeAt.value + " ("+closeAt.day.charAt(0).toUpperCase() + closeAt.day.slice(1) +")"
        }

        const eventObject = {openAt: value.value, closeAt: closeAt.value}
        eventsByDay[value.day].push(eventObject)
      }
    })       
    setEventsByDay(prevState => ({ ...prevState, eventsByDay}))
  }

  useEffect(() => {
    processUserData(userData)
  } // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between mb-3" >
          <div>
            <h1 className="display-4">Opening Times</h1>
          </div>
          <div className="mt-auto">
            <h3>{currentDayName}</h3>
            </div>
        </div>
        {error ? <DisplayError error={error} /> : ""} 
        <div className="accordion" id="weekdaysAccordion">
          <WeekDays currentDay={currentDayName} weekDayNames={weekDayNames} weekDayOrder={weekDayOrder} openingEvents={events}/>  
        </div>
        <p className="mt-3 d-flex justify-content-end">All times in {timeZone}</p>
  
      </div>    
    </div>
  );
};

export default App;
