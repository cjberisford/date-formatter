import React from 'react'
import App from './App'
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Date-formatter app', function() {

  it("succesfully renders the page", () => {
    act(() => {
      render(<App />, container)
    })
    expect(container.textContent).toContain('Opening Times')
  })
})

/* 
  1) Closing time over a day after opening time

  2) Next event must be a close event, else data invalid

    if (closeAt.type !== 'close') {
      throw new EventException("Not allowed consecutive open/close events.")
    }

  3) Catch equal opening and closing times

    if (closeAt.value === value.value) {
      throw new EventException("Opening and closing times must be different.")
    }

  4) Add day to closing time if >24 hrs

    if (Math.abs(closeAt.order - value.order) > 86400) {
      console.log(Math.abs(closeAt.order - value.order))
      closeAt.value = closeAt.value + " ("+closeAt.day.charAt(0).toUpperCase() + closeAt.day.slice(1) +")"
    }

  5) Conversion will fail if seconds > 86400

  6) Consecutive close events will be ignored. 
*/

