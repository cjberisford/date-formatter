import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import WeekDay from "./WeekDay";


export default function WeekDays( { openingTimes, dayNames }) {
  return (
    dayNames.map(weekday => {
      const currentDayEvents = openingTimes[weekday]
      return <WeekDay key={uuidv4()} dayName={weekday} events={currentDayEvents} />
    })
  )
}
