import React from "react"
import { render, screen } from "../utilities/test-utils"

import StarRating from "./_star_rating"

const testId = "star-rating-kit"

describe("Star Rating Kit", () => {
  test("Expects to have correct classname", () => {
    render(<StarRating data={{ testid: testId }} rating={2} />)

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_star_rating_kit")
  })

  test("should render aria-label", () => {
    render(
      <StarRating
        aria={{ label: testId }}
        data={{ testid: testId }}
        rating={2}
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute("aria-label", testId)
  })

  test("Displays two highlighted stars", () => {
    render(<StarRating data={{ testid: testId }} rating={2} />)

    const kit = screen.getByTestId(testId)
    const highlight = kit.querySelector(".pb_star_rating_highlight")
    const stars = highlight.querySelectorAll(".far.fa-star")
    const count = stars.length

    expect(count).toBe(2)
  })

  test("Displays three highlighted stars and a half star", () => {
    render(<StarRating data={{ testid: testId }} rating={3.5} />)

    const kit = screen.getByTestId(testId)
    const highlight = kit.querySelector(".pb_star_rating_highlight")
    const stars = highlight.querySelectorAll(".far.fa-star")
    const halfStars = highlight.querySelectorAll(".far.fa-star-half")
    const starCount = stars.length
    const halfStarCount = halfStars.length

    expect(starCount).toBe(3)
    expect(halfStarCount).toBe(1)
  })
})
