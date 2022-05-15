import React from 'react'
import OpeningTime from "./OpeningTime";
import { v4 as uuidv4 } from 'uuid';

export default function OpeningTimes( { events } ) {
  if (events.length > 0) {
    return (
      events.map(event => {
        return <OpeningTime key={uuidv4()} openAt={event['openAt']} closeAt={event['closeAt']}/>
      })
    )
  }
  return 'Closed'
}
