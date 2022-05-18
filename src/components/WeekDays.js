import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import WeekDay from "./WeekDay";

export default function WeekDays( { currentDay, weekDayNames, weekDayOrder, openingEvents } ) {

  
  return (
      weekDayOrder.map(weekday => {
      const dayToRender = weekDayNames[weekday]
      const eventsOnDay = openingEvents[dayToRender]
      return (
        <div key={uuidv4()} >
          <WeekDay currentDay={currentDay} dayName={dayToRender} dayNames={weekDayNames} events={eventsOnDay} />
        </div>
      )
    })
  )
}

