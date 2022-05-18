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

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  it("succesfully renders the page", () => {
    act(() => {
      render(<App />, container)
    })
    expect(container.textContent).toContain('Opening Times')
  })
})


// Closing time over a day after opening time


