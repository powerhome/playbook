import React from "react"
import { render, screen } from "../utilities/test-utils"

import Textarea from "./_textarea"

const testId = "textarea-kit"

describe("TextArea Kit Props", () => {
  test("Expects to have correct classname", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          label="Label"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass("pb_textarea_kit")
  })

  test("should render aria-label", () => {
    render(
      <Textarea
          aria={{ label: testId }}
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute("aria-label", testId)
  })

  test("should render custom classname", () => {
    render(
      <Textarea
          className={"text_class"}
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)

    expect(kit).toHaveClass("text_class")
  })

  test("should render value", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          value={"Default Value"}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.innerHTML).toBe("Default Value")
  })

  test("should render disabled", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          disabled={false}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.disabled).toBe(false)
  })

  test("should render rows", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          rows={7}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.rows).toBe(7)
  })

  test("should render character count", () => {
    render(
      <Textarea
          characterCount={50}
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)
    const counter = kit.querySelector(".pb_caption_kit_xs")

    expect(counter.innerHTML).toBe("50")
  })

  test("should have inline class", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          inline
      />
    )

    const kit = screen.getByTestId(testId)

    expect(kit).toHaveClass("inline")
  })

  test("should have resize class", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          resize={"none"}
      />
    )

    const kit = screen.getByTestId(testId)

    expect(kit).toHaveClass("resize_none")
  })

  test("should render error", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          error={"error message"}
      />
    )

    const kit = screen.getByTestId(testId)
    const error = kit.querySelector(".pb_body_kit_negative")

    expect(kit).toHaveClass("error")
    expect(error.innerHTML).toBe("error message")
  })

  test("should render label", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          label={"Test Label"}
      />
    )

    const kit = screen.getByTestId(testId)
    const error = kit.querySelector(".pb_caption_kit_md")

    expect(error.innerHTML).toBe("Test Label")
  })

  test("should render max character display", () => {
    render(
      <Textarea
          characterCount={"11"}
          data={{ testid: testId }}
          maxCharacters={"10"}
      />
    )

    const kit = screen.getByTestId(testId)
    const error = kit.querySelector(".pb_caption_kit_xs")

    expect(error.innerHTML).toBe("11 / 10")
  })

  test("should render max character display", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          name={"TestName"}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.name).toBe("TestName")
  })

  test("should render placeholder", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          placeholder={"Test Placeholder"}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.placeholder).toBe("Test Placeholder")
  })

  test("should be required", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          required
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea.required).toBeTruthy()
  })
})
