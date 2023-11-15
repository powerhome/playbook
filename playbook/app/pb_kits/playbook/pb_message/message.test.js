import React from "react"
import { render, screen } from "../utilities/test-utils"
import Message from "./_message"
import Image from "./../pb_image/_image"

const testId = "message"

const MessageDefault = () => {
  return (
    <>
      <Message
        avatarName="Becca Jacobs"
        avatarUrl="https://randomuser.me/api/portraits/women/50.jpg"
        className="custom-class"
        data={{ testid: testId }}
        label="Lucille Sanchez"
        message="Application for Kate Smith is waiting for your approval"
        timestamp="2 days ago"
      >
        <Image
          alt="picture of a misty forest"
          size="md"
          url="https://unsplash.it/500/400/?image=634"
        />
      </Message>
    </>
  )
}

test("should render message", () => {
  render(<MessageDefault />)

  const kit = screen.getByText(
    "Application for Kate Smith is waiting for your approval"
  )
  expect(kit).toBeInTheDocument()
})

test("should render label", () => {
  render(<MessageDefault />)

  const kit = screen.getByText("Lucille Sanchez")
  expect(kit).toBeInTheDocument()
})

test("should render timestamp", () => {
  render(<MessageDefault />)

  const kit = screen.getByText("2 days ago")
  expect(kit).toBeInTheDocument()
})

test("should render custom class and data", () => {
  render(<MessageDefault />)

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("custom-class")
})

test("should render a children", () => {
  render(<MessageDefault />)

  const kit = screen.getByAltText("picture of a misty forest")
  expect(kit).toBeInTheDocument()
})
