import React from "react"

import { render, screen } from "../utilities/test-utils"

import Person from "./_person"

test("renders person classname", () => {
  render(
    <Person
      data={{ testid: "classname-test" }}
      firstName="Kyle"
      lastName="Fadigan"
    />
  )

  const kit = screen.getByTestId("classname-test")
  expect(kit).toHaveClass("pb_person_kit")
})

test("it renders the component with the first name", () => {
  render(<Person firstName="Kyle" lastName="Fadigan" />)

  const kit = screen.getByText("Kyle")
  expect(kit).toBeTruthy()
})

test("it renders the component with the last name", () => {
  render(<Person firstName="Kyle" lastName="Fadigan" />)

  const kit = screen.getByText("Fadigan")
  expect(kit).toBeTruthy()
})
