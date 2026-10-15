import React from "react"
import { render, fireEvent, act } from "../utilities/test-utils"
import Dropdown from "./_dropdown"

const options = [{ id: "one", value: "first", label: "First" }, { value: "second", label: "Second" }]
const formValues = (form, name) => new FormData(form).getAll(name)

test("submits ids with a value fallback and normalizes array field names", () => {
  const { container } = render(
    <form>
      <Dropdown
          defaultValue={options}
          enableFormSupport
          multiSelect
          name="tags[]"
          options={options}
      />
    </form>
  )
  expect(formValues(container.querySelector("form"), "tags[]")).toEqual(["one", "second"])
  expect(container.querySelector('[name="tags[][]"]')).toBeNull()
})

test("controlled selections and disabled fields are reflected in FormData", () => {
  const { container, rerender } = render(
    <form>
      <Dropdown
          enableFormSupport
          name="tag"
          options={options}
          value={options[0]}
      />
    </form>
  )
  const form = container.querySelector("form")
  expect(formValues(form, "tag")).toEqual(["one"])
  rerender(
    <form>
      <Dropdown
          enableFormSupport
          name="tag"
          options={options}
          value={options[1]}
      />
    </form>
  )
  expect(formValues(form, "tag")).toEqual(["second"])
  rerender(
    <form>
      <Dropdown
          disabled
          enableFormSupport
          name="tag"
          options={options}
          value={options[1]}
      />
    </form>
  )
  expect(formValues(form, "tag")).toEqual([])
})

test("required validation shows the message and clears after selecting", () => {
  const { container, getByText } = render(
    <form>
      <Dropdown
          autocomplete
          enableFormSupport
          name="tag"
          options={options}
          required
          validationMessage="Choose a tag"
      />
    </form>
  )
  const form = container.querySelector("form")
  act(() => { expect(form.checkValidity()).toBe(false) })
  expect(getByText("Choose a tag")).toBeInTheDocument()
  expect(document.activeElement).toBe(container.querySelector(".dropdown_input"))
  fireEvent.click(getByText("First"))
  expect(form.checkValidity()).toBe(true)
  expect(container.querySelector('[role="alert"]')).toBeNull()
  expect(formValues(form, "tag")).toEqual(["one"])
})

test("native reset restores defaults and canceled reset preserves the selection", async () => {
  const { container, getByText } = render(
    <form>
      <Dropdown
          defaultValue={options[0]}
          enableFormSupport
          name="tag"
          options={options}
      />
    </form>
  )
  const form = container.querySelector("form")
  fireEvent.click(getByText("Second"))
  expect(formValues(form, "tag")).toEqual(["second"])
  await act(async () => { form.reset() })
  expect(formValues(form, "tag")).toEqual(["one"])
  fireEvent.click(getByText("Second"))
  form.addEventListener("reset", event => event.preventDefault())
  await act(async () => { form.reset() })
  expect(formValues(form, "tag")).toEqual(["second"])
})

test("controlled empty values and blank selections remain invalid", () => {
  const { container, rerender } = render(
    <form>
      <Dropdown
          enableFormSupport
          name="tag"
          required
          value={null}
      />
    </form>
  )
  act(() => { expect(container.querySelector("form").checkValidity()).toBe(false) })
  expect(container.querySelector('[role="alert"]')).toHaveTextContent("Please fill out this field.")
  rerender(
    <form>
      <Dropdown
          enableFormSupport
          name="tag"
          required
          value={{ label: "None", value: "" }}
      />
    </form>
  )
  act(() => { expect(container.querySelector("form").checkValidity()).toBe(false) })
})

test("reset without a default reports a null single selection", async () => {
  const onSelect = jest.fn()
  const { container } = render(
    <form>
      <Dropdown
          enableFormSupport
          name="tag"
          onSelect={onSelect}
          options={options}
          value={options[0]}
      />
    </form>
  )
  await act(async () => { container.querySelector("form").reset() })
  expect(onSelect).toHaveBeenLastCalledWith(null)
})

test.each([undefined, false])("form support %s preserves existing named-field and reset behavior", async enableFormSupport => {
  const onSelect = jest.fn()
  const { container, getByText } = render(
    <form>
      <Dropdown defaultValue={options[0]}
          enableFormSupport={enableFormSupport}
          name="tag"
          onSelect={onSelect}
          options={options}
          required
      />
    </form>
  )
  const form = container.querySelector("form")
  expect(container.querySelector('input[type="hidden"]')).toBeNull()
  expect(container.querySelector('input[required]')).toBeNull()
  expect(new FormData(form).has("tag")).toBe(false)
  expect(form.checkValidity()).toBe(true)
  fireEvent.click(getByText("Second"))
  onSelect.mockClear()
  await act(async () => { form.reset() })
  expect(onSelect).not.toHaveBeenCalled()
  expect(container.querySelector(".pb_dropdown_trigger")).toHaveTextContent("Second")
})
