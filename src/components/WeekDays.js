import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import WeekDay from "./WeekDay";


export default function WeekDays( { openingTimes }) {

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  // Parse import data on first page load
  console.log(openingTimes)

  return (

    weekDays.map(weekday => {
      const currentDayEvents = openingTimes[weekday]
      return <WeekDay key={uuidv4()} dayName={weekday} events={currentDayEvents} />
    })
  )
}
