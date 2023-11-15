import React from "react"
import { render, screen } from "../utilities/test-utils"

import StatValue from "./_stat_value"

test("it renders the component with the value", () => {
  render(<StatValue value={1048} />)

  const kit = screen.getByText("1048")
  expect(kit).toBeTruthy()
})

test("it renders the component with the unit", () => {
  render(<StatValue unit="appt" value="5,294" />)

  const kit = screen.getByText("appt")
  expect(kit).toBeTruthy()
})
