import React, { useState } from "react"
import { render, fireEvent, waitFor, screen, act } from "../utilities/test-utils"
import Dropdown from "./_dropdown"

beforeEach(() => jest.useRealTimers())

const options = [{ id: "existing", label: "Existing", value: "existing" }]
const type = (container, value) => fireEvent.change(container.querySelector(".dropdown_input"), { target: { value } })
const created = text => ({ id: text, label: text, value: text, __isNew__: true })

test("creation enables autocomplete and Enter selects a trimmed value without submitting", () => {
  const onSelect = jest.fn()
  const submit = jest.fn(event => event.preventDefault())
  const { container } = render(<form onSubmit={submit}><Dropdown allowOptionCreation
      enableFormSupport
      name="tag"
      onSelect={onSelect}
      options={options}
      required
                                                       /></form>)
  type(container, "  New tag  ")
  expect(screen.getByText('Create "New tag"')).toBeInTheDocument()
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter" })
  expect(onSelect).toHaveBeenCalledWith(created("New tag"))
  expect(new FormData(container.querySelector("form")).get("tag")).toBe("New tag")
  expect(container.querySelector("form").checkValidity()).toBe(true)
  expect(submit).not.toHaveBeenCalled()
})

test("does not offer whitespace, case-insensitive duplicates, or selected values", () => {
  const { container } = render(<Dropdown allowOptionCreation
      defaultValue={[created("Selected")]}
      multiSelect
      options={options}
                               />)
  for (const value of ["   ", " EXISTING ", "selected"]) {
    type(container, value)
    expect(screen.queryByText(/^Create "/)).toBeNull()
  }
})

test("controlled multi-select creation, removal, and clear emit normal selection payloads", () => {
  const changes = jest.fn()
  const Controlled = () => {
    const [value, setValue] = useState([])
    return (<Dropdown allowOptionCreation
        enableFormSupport
        multiSelect
        name="tags[]"
        onChange={event => { changes(event); setValue(event.target.value) }}
        options={[]}
        value={value}
            />)
  }
  const { container } = render(<form><Controlled /></form>)
  type(container, "First")
  fireEvent.click(screen.getByText('Create "First"'))
  type(container, "Second")
  fireEvent.click(screen.getByText('Create "Second"'))
  expect(changes).toHaveBeenLastCalledWith({ target: { name: "tags[]", value: [created("First"), created("Second")] } })
  expect(new FormData(container.querySelector("form")).getAll("tags[]")).toEqual(["First", "Second"])
  fireEvent.click(container.querySelector(".pb_form_pill_kit .pb_custom_icon"))
  expect(new FormData(container.querySelector("form")).getAll("tags[]")).toEqual(["Second"])
})

test.each(["promise", "callback"])("async %s loader settles before creation is offered", async mode => {
  let finish
  const loadOptions = mode === "promise" ? jest.fn(() => new Promise(resolve => { finish = resolve })) : jest.fn((query, callback) => { finish = callback })
  const { container } = render(<Dropdown allowOptionCreation
      async
      loadOptions={loadOptions}
      options={[]}
                               />)
  type(container, "New")
  expect(screen.queryByText('Create "New"')).toBeNull()
  await waitFor(() => expect(loadOptions).toHaveBeenCalled())
  act(() => finish([]))
  await waitFor(() => expect(screen.getByText('Create "New"')).toBeInTheDocument())
})

test("remote duplicates suppress creation and stale results cannot replace a newer query", async () => {
  const callbacks = {}
  const loadOptions = jest.fn((query, callback) => { callbacks[query] = callback })
  const { container } = render(<Dropdown allowOptionCreation
      async
      loadOptions={loadOptions}
      options={[]}
                               />)
  type(container, "Old")
  await waitFor(() => expect(callbacks.Old).toBeDefined())
  type(container, "New")
  await waitFor(() => expect(callbacks.New).toBeDefined())
  act(() => callbacks.New([{ id: "server", label: "New", value: "server" }]))
  act(() => callbacks.Old([]))
  expect(screen.queryByText('Create "New"')).toBeNull()
  expect(screen.getByText("New")).toBeInTheDocument()
})

test("composition does not create an option and quickpick ignores creation", () => {
  const onSelect = jest.fn()
  const { container, rerender } = render(<Dropdown allowOptionCreation
      onSelect={onSelect}
      options={[]}
                                         />)
  type(container, "New")
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter", isComposing: true })
  expect(onSelect).not.toHaveBeenCalled()
  rerender(<Dropdown allowOptionCreation
      variant="quickpick"
           />)
  expect(container.querySelector(".dropdown_input")).toBeNull()
})

test.each([undefined, false])("creation %s leaves autocomplete and options unchanged", allowOptionCreation => {
  const { container } = render(<Dropdown allowOptionCreation={allowOptionCreation}
      options={options}
                               />)
  expect(container.querySelector(".dropdown_input")).toBeNull()
  expect(screen.queryByText(/^Create "/)).toBeNull()
  expect(screen.getByText("Existing")).toBeInTheDocument()
})

test("option creation alone does not opt into native form submission", () => {
  const { container } = render(<form><Dropdown allowOptionCreation
      name="tag"
      options={[]}
                                     /></form>)
  type(container, "New")
  fireEvent.click(screen.getByText('Create "New"'))
  expect(new FormData(container.querySelector("form")).has("tag")).toBe(false)
})

test("composition preserves legacy selection behavior when creation is disabled", () => {
  const onSelect = jest.fn()
  const { container } = render(<Dropdown autocomplete
      onSelect={onSelect}
      options={options}
                               />)
  const input = container.querySelector(".dropdown_input")
  fireEvent.keyDown(input, { key: "ArrowDown" })
  fireEvent.keyDown(input, { key: "Enter", isComposing: true })
  expect(onSelect).toHaveBeenCalledWith(options[0])
})

test.each([undefined, "outside"])("a second Enter preserves a created selection and permits submission with closeOnClick %s", closeOnClick => {
  const onSelect = jest.fn()
  const { container } = render(
    <form>
      <Dropdown allowOptionCreation
          closeOnClick={closeOnClick}
          enableFormSupport
          name="tag"
          onSelect={onSelect}
          options={options}
      />
    </form>
  )
  const input = container.querySelector(".dropdown_input")
  type(container, "New tag")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false)
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(onSelect).toHaveBeenLastCalledWith(created("New tag"))
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(new FormData(container.querySelector("form")).get("tag")).toBe("New tag")
})

test("Enter on mount or a whitespace query does not select a static option", () => {
  const onSelect = jest.fn()
  const { container } = render(<Dropdown allowOptionCreation
      onSelect={onSelect}
      options={options}
                               />)
  const input = container.querySelector(".dropdown_input")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(container.querySelector(".pb_dropdown_container")).toHaveClass("close")
  type(container, "   ")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).not.toHaveBeenCalled()
})

test("Enter confirms the Create row ahead of a partial static match", () => {
  const onSelect = jest.fn()
  const { container } = render(<Dropdown allowOptionCreation
      onSelect={onSelect}
      options={options}
                               />)
  type(container, "Ex")
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter" })
  expect(onSelect).toHaveBeenCalledWith(created("Ex"))
})

test("closing the menu with a pending query makes Enter available to the form", () => {
  const onSelect = jest.fn()
  const { container } = render(<Dropdown allowOptionCreation
      onSelect={onSelect}
      options={options}
                               />)
  type(container, "New")
  const input = container.querySelector(".dropdown_input")
  fireEvent.keyDown(input, { key: "Escape" })
  expect(container.querySelector(".pb_dropdown_container")).toHaveClass("close")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).not.toHaveBeenCalled()
})

test("async creation leaves the following Enter available for submission", async () => {
  const onSelect = jest.fn()
  const loadOptions = jest.fn(() => Promise.resolve([]))
  const { container } = render(<Dropdown allowOptionCreation
      async
      loadOptions={loadOptions}
      onSelect={onSelect}
      options={options}
                               />)
  type(container, "New tag")
  await waitFor(() => expect(screen.getByText('Create "New tag"')).toBeInTheDocument())
  const input = container.querySelector(".dropdown_input")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false)
  expect(onSelect).toHaveBeenLastCalledWith(created("New tag"))
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).toHaveBeenCalledTimes(1)
})
