
import openingTimes from "./data/userData";
import WeekDays from "./components/WeekDays";
import { useEffect, useState } from "react";

const App = () => {

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const weekDaysObject = weekDays.reduce(function(result, item, index, array) {
    result[item] = []
    return result
  }, {})
  const [openingTimeData, setOpeningTimeData] = useState(weekDaysObject)


  /**
   * Matches pairs of opening/closing times
   *
   * @param {object} events Ordered list of opening/closing events
   */
  function windowBuilder(events) {
    events.forEach((value, index, array) => {
      if (value.type === 'open') {
        let closeAt = array[0].value
        if (index !== array.length-1) {
          closeAt = array[index + 1].value
        } 

        const eventObject = {openAt: value.value, closeAt: closeAt}
        weekDaysObject[value.day].push(eventObject)
      }
    })


    setOpeningTimeData(prevState => ({ ...prevState, weekDaysObject}))
  }

  /**
   * Processes opening time data
   *
   * @param {object} data Opening time object
   */
  function processInputData(data) {
    const events = []
    Object.keys(data).forEach(key => {
      data[key].forEach(event => {
        const dayNumber = weekDays.indexOf(key)
        const order = (dayNumber * 84600) + event.value
        const timeISO = new Date(event.value * 1000)
        const timeFormatted = timeISO.toLocaleString('en-UK', { hour: 'numeric', hour12: true })
  
        events.push({...event, value: timeFormatted, order: order, day: key, dayNumber: dayNumber})
      })
    })
    events.sort((a, b) => a.order > b.order ? 1 : -1)
    windowBuilder(events)
  }

  useEffect(() => {
    processInputData(openingTimes)
  }, [])

  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="container">
        {/* <h3 className="d-flex justify-content-end"></h3> */}
        <div className="accordion" id="weekdaysAccordion">
          <WeekDays openingTimes={openingTimeData}/>  
        </div>
      </div>
    </div>    
  );
};

export default App;
