import React from "react"
import { render, screen } from "../utilities/test-utils"

import StarRating from "./_star_rating"

const testId = "star-rating-kit"

describe("Star Rating Kit", () => {
  test("Expects to have correct classname", () => {
    render(
      <StarRating
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit.className).toBe("pb_star_rating_kit")

  })

  test('should render aria-label', () => {
    render(
      <StarRating
          aria={{ label: testId }}
          data={{ testid: testId }}
          rating={2}
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
  })

  test("Displays correct denominator", () => {
    render(
      <StarRating
          data={{ testid: testId }}
          denominator={4}
          rating={2}
          size="xs"
      />
    )

    const kit = screen.getByTestId(testId)
    const highlight = kit.querySelector(".star_flex_area")
    const stars = highlight.querySelectorAll(".pb_star_xs")
    const count = stars.length

    expect(count).toBe(4)
  })

  test("Uses correct size", () => {
    render(
      <StarRating
          data={{ testid: testId }}
          layoutOption="number"
          rating={2}
          size="lg"
      />
    )

    const kit = screen.getByTestId(testId)
    const highlight = kit.querySelector(".star_flex_area")
    const title = kit.querySelector(".pb_star_rating_number_lg")
    const stars = highlight.querySelectorAll(".pb_star_lg")
    const count = stars.length

    expect(title.className).toBe("pb_title_kit pb_title_2 pb_title_light pb_title_thin pr_sm pb_star_rating_number_lg")
    expect(count).toBe(5)
  })
})
