import React from 'react'
import OpeningTime from "./OpeningTime";
import { v4 as uuidv4 } from 'uuid';

export default function OpeningTimes( { openingTimes } ) {
  return (
    openingTimes.map(session => {
      return <OpeningTime key={uuidv4()} type={session['type']} value={session['value']}/>
    })
  )
}
