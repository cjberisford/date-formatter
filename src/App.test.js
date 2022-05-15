import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

// Validate input data -- Must be equal number of opening/closing times

// Validate input data -- When sorted, opening times must be followed by a closing time and vice versa 

// Closing time inserted BEFORE opening time

// Closing time equal to opening time -- should this be ignored?

// Closing time over a day after opening time


