import React, { useState } from "react"
import { render, screen, fireEvent, within } from "../utilities/test-utils"

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
    const error = kit.querySelector(".pb_caption_kit_md_lighter")

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

describe("Textarea Emoji Mask", () => {
  const TextareaEmojiMask = (props) => {
    const [value, setValue] = useState('')
    const handleOnChange = ({ target }) => {
      setValue(target.value)
    }

    return (
      <Textarea
          emojiMask
          onChange={handleOnChange}
          value={value}
          {...props}
      />
    )
  }

  test("removes emoji characters when emojiMask is enabled", () => {
    render(
      <TextareaEmojiMask
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    fireEvent.change(textarea, { target: { value: 'Hello 👋 World 🌍' } })
    expect(textarea.value).toBe('Hello  World ')

    fireEvent.change(textarea, { target: { value: '😀😂🎉' } })
    expect(textarea.value).toBe('')

    fireEvent.change(textarea, { target: { value: 'Hello World' } })
    expect(textarea.value).toBe('Hello World')
  })

  test("allows accented characters when emojiMask is enabled", () => {
    render(
      <TextareaEmojiMask
          data={{ testid: testId }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    fireEvent.change(textarea, { target: { value: 'Café résumé naïve' } })
    expect(textarea.value).toBe('Café résumé naïve')

    fireEvent.change(textarea, { target: { value: 'àëǒüñ' } })
    expect(textarea.value).toBe('àëǒüñ')
  })

  test('renders required indicator asterisk when requiredIndicator is true', () => {
    render(
      <Textarea
          data={{ testid: testId }}
          label="Name"
          required
          requiredIndicator
      />
    )

    const kit = screen.getByTestId(testId)
    const label = within(kit).getByText(/Name/)

    expect(label).toBeInTheDocument()
    expect(kit).toHaveTextContent('*')
  })
})

describe("Textarea Input Options", () => {
  test("should apply inputOptions.id to textarea element", () => {
    render(<Textarea data={{ testid: testId }}
        inputOptions={{ id: "custom-textarea-id" }}
           />)

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea).toHaveAttribute("id", "custom-textarea-id")
  })

<<<<<<< PLAY-2798-id-vs-inputoptionsid-for-textarea
  test("should apply id prop to container and inputOptions.id to textarea", () => {
=======
  test("should allow inputOptions.id to override id prop", () => {
>>>>>>> master
    render(
      <Textarea data={{ testid: testId }}
          id="wrapper-id"
          inputOptions={{ id: "textarea-id" }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

<<<<<<< PLAY-2798-id-vs-inputoptionsid-for-textarea
    expect(kit).toHaveAttribute("id", "wrapper-id")
    expect(textarea).toHaveAttribute("id", "textarea-id")
  })

  test("should apply id prop to container and derived id to textarea when only id passed", () => {
    render(
      <Textarea data={{ testid: testId }}
          id="wrapper-id"
          label="Label"
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")
    const label = kit.querySelector("label")

    expect(kit).toHaveAttribute("id", "wrapper-id")
    expect(textarea).toHaveAttribute("id", "wrapper-id-input")
    expect(label).toHaveAttribute("for", "wrapper-id-input")
  })

=======
    expect(textarea).toHaveAttribute("id", "textarea-id")
  })

>>>>>>> master
  test("should apply inputOptions.data as data-* attributes", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          inputOptions={{
          data: { controller: "textarea", action: "focus->handleFocus" }
        }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea).toHaveAttribute("data-controller", "textarea")
    expect(textarea).toHaveAttribute("data-action", "focus->handleFocus")
  })

  test("should apply multiple inputOptions attributes to textarea", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          inputOptions={{
          id: "textarea-id",
          className: "custom-class",
          data: { controller: "textarea" }
        }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea).toHaveAttribute("id", "textarea-id")
    expect(textarea).toHaveAttribute("class", "custom-class")
    expect(textarea).toHaveAttribute("data-controller", "textarea")
  })

  test("should merge aria-describedby from error and inputOptions", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          error="This is an error"
          inputOptions={{
<<<<<<< PLAY-2798-id-vs-inputoptionsid-for-textarea
          id: "describedby-textarea",
=======
>>>>>>> master
          "aria-describedby": "custom-help-text"
        }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    // Should contain both the error ID and custom ID
    expect(textarea).toHaveAttribute("aria-describedby", expect.stringContaining("-error"))
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("custom-help-text")
    )
  })

  test("should allow inputOptions aria-invalid to override error state", () => {
    render(
      <Textarea
          data={{ testid: testId }}
          error="This is an error"
          inputOptions={{
          "aria-invalid": false
        }}
      />
    )

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea).toHaveAttribute("aria-invalid", "false")
  })

  test("should default aria-invalid to error state when not provided in inputOptions", () => {
    render(<Textarea data={{ testid: testId }}
        error="This is an error"
           />)

    const kit = screen.getByTestId(testId)
    const textarea = kit.querySelector("textarea")

    expect(textarea).toHaveAttribute("aria-invalid", "true")
  })
})
