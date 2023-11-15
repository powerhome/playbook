import React from "react"
import { render, screen } from "../utilities/test-utils"

import MultipleUsersStacked from "./_multiple_users_stacked"

const testId = "multipleUsersStacked"
const className = "custom-class-name"
const nameUser1 = "Patrick Welch"
const nameUser2 = "Lucille Sanchez"
const imageUser1 = "https://randomuser.me/api/portraits/men/9.jpg"
const imageUser2 = "https://randomuser.me/api/portraits/women/6.jpg"

const MultipleUsersStackedDefault = () => {
  return (
    <MultipleUsersStacked
      aria={{ label: testId }}
      className={className}
      data={{ testid: testId }}
      users={[
        {
          name: nameUser1,
          imageUrl: imageUser1,
          imageAlt: nameUser1,
        },
        {
          name: nameUser2,
          imageUrl: imageUser2,
          imageAlt: nameUser2,
        },
      ]}
    />
  )
}

test("should render alt names and images", () => {
  render(<MultipleUsersStackedDefault />)

  const image1 = screen.getByAltText(nameUser1)
  const image2 = screen.getByAltText(nameUser2)

  expect(image1).toHaveAttribute("src", imageUser1)
  expect(image2).toHaveAttribute("src", imageUser2)
})

test("should pass data prop", () => {
  render(<MultipleUsersStackedDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
})

test("should pass className prop", () => {
  render(<MultipleUsersStackedDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(className)
})

test("should pass aria prop", () => {
  render(<MultipleUsersStackedDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute("aria-label", testId)
})
