import React from "react"
import { render, screen } from "../utilities/test-utils"
import PersonContact from "./_person_contact"

const testId = "personContact"
const multipleTestId = "personContactMultiple"

const PersonContactTest = props => {
  return (
    <>
      <PersonContact
        aria={{ label: testId }}
        className={"custom-class"}
        contacts={[
          {
            contactType: "email",
            contactValue: "email@example.com",
          },
          {
            contactValue: "5555555555",
            contactDetail: "Home",
          },
          {
            contactType: "work",
            contactValue: "3245627482",
            contactDetail: "Work",
          },
        ]}
        data={{ testid: testId }}
        firstName="Jose"
        id={testId}
        lastName="da Silva"
        {...props}
      />
      <PersonContact
        contacts={[
          {
            contactValue: "5555555555",
            contactType: "wrong-phone",
          },
        ]}
        data={{ testid: multipleTestId }}
        firstName="Brenda"
        lastName="Walters"
        {...props}
      />
    </>
  )
}

test("should render custom class and data", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("custom-class")
})

test("should render id", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveProperty("id", testId)
})

test("should render aria-label", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute("aria-label", testId)
})

test("should render firstName", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveTextContent("Jose")
})

test("should render lastName", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveTextContent("da Silva")
})

test("should render contact value", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveTextContent("(555) 555-5555")
})

test("should render contact detail", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveTextContent("Home")
})

test("should render multiple contacts", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(multipleTestId)
  expect(kit).toHaveTextContent("Brenda Walters")
})

test("should render wrong number", () => {
  render(<PersonContactTest />)

  const kit = screen.getByTestId(multipleTestId)
  expect(kit).toHaveTextContent("wrong number")
})
