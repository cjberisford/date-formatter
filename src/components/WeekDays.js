import React from 'react'

import WeekDay from "./WeekDay";
import { v4 as uuidv4 } from 'uuid';

export default function WeekDays( { openingTimes }) {

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]



  // What do I pass to the accordion? 
  // Day of the week
  // Opening times for that day


  return (

    weekDays.map(weekday => {
      return <WeekDay key={uuidv4()} dayName={weekday} openingTimes={openingTimes[weekday]} />
    })

    
    // Object.keys(openingTimes).forEach(weekday => {
    //   return <WeekDay key={weekday} dayName={weekday} openingTimes={weekday} />
    // })y
  )
}
