import React, { useState } from "react"
import { render, fireEvent, waitFor, screen, act } from "../utilities/test-utils"
import Dropdown from "./_dropdown"

beforeEach(() => jest.useRealTimers())

const options = [{ id: "existing", label: "Existing", value: "existing" }]
const typeQuery = (container, value) => {
  const input = container.querySelector(".dropdown_input")
  fireEvent.change(input, { target: { value } })
}
const createdOption = text => ({ id: text, label: text, value: text, __isNew__: true })

test("creation enables autocomplete and Enter selects a trimmed value without submitting", () => {
  const onSelect = jest.fn()
  const submit = jest.fn(event => event.preventDefault())
  const { container } = render(
    <form onSubmit={submit}>
      <Dropdown
          allowOptionCreation
          enableFormSupport
          name="tag"
          onSelect={onSelect}
          options={options}
          required
      />
    </form>
  )
  typeQuery(container, "  New tag  ")
  expect(screen.getByText('Create "New tag"')).toBeInTheDocument()
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter" })
  expect(onSelect).toHaveBeenCalledWith(createdOption("New tag"))
  expect(new FormData(container.querySelector("form")).get("tag")).toBe("New tag")
  expect(container.querySelector("form").checkValidity()).toBe(true)
  expect(submit).not.toHaveBeenCalled()
})

test("does not offer whitespace, case-insensitive duplicates, or selected values", () => {
  const { container } = render(
    <Dropdown
        allowOptionCreation
        defaultValue={[createdOption("Selected")]}
        multiSelect
        options={options}
    />
  )
  for (const value of ["   ", " EXISTING ", "selected"]) {
    typeQuery(container, value)
    expect(screen.queryByText(/^Create "/)).toBeNull()
  }
})

test("controlled multi-select creation, removal, and clear emit normal selection payloads", () => {
  const changes = jest.fn()
  const Controlled = () => {
    const [value, setValue] = useState([])
    return (
      <Dropdown
          allowOptionCreation
          enableFormSupport
          multiSelect
          name="tags[]"
          onChange={event => {
            changes(event)
            setValue(event.target.value)
          }}
          options={[]}
          value={value}
      />
    )
  }
  const { container } = render(<form><Controlled /></form>)
  typeQuery(container, "First")
  fireEvent.click(screen.getByText('Create "First"'))
  typeQuery(container, "Second")
  fireEvent.click(screen.getByText('Create "Second"'))
  expect(changes).toHaveBeenLastCalledWith({
    target: {
      name: "tags[]",
      value: [createdOption("First"), createdOption("Second")],
    },
  })
  expect(new FormData(container.querySelector("form")).getAll("tags[]")).toEqual(["First", "Second"])
  fireEvent.click(container.querySelector(".pb_form_pill_kit .pb_custom_icon"))
  expect(new FormData(container.querySelector("form")).getAll("tags[]")).toEqual(["Second"])
})

test.each(["promise", "callback"])("async %s loader settles before creation is offered", async mode => {
  let finish
  const promiseLoader = () => new Promise(resolve => {
    finish = resolve
  })
  const callbackLoader = (_query, callback) => {
    finish = callback
  }
  const loadOptions = jest.fn(mode === "promise" ? promiseLoader : callbackLoader)
  const { container } = render(
    <Dropdown
        allowOptionCreation
        async
        loadOptions={loadOptions}
        options={[]}
    />
  )
  typeQuery(container, "New")
  expect(screen.queryByText('Create "New"')).toBeNull()
  await waitFor(() => expect(loadOptions).toHaveBeenCalled())
  act(() => finish([]))
  await waitFor(() => expect(screen.getByText('Create "New"')).toBeInTheDocument())
})

test("remote duplicates suppress creation and stale results cannot replace a newer query", async () => {
  const callbacks = {}
  const loadOptions = jest.fn((query, callback) => {
    callbacks[query] = callback
  })
  const { container } = render(
    <Dropdown
        allowOptionCreation
        async
        loadOptions={loadOptions}
        options={[]}
    />
  )
  typeQuery(container, "Old")
  await waitFor(() => expect(callbacks.Old).toBeDefined())
  typeQuery(container, "New")
  await waitFor(() => expect(callbacks.New).toBeDefined())
  act(() => callbacks.New([{ id: "server", label: "New", value: "server" }]))
  act(() => callbacks.Old([]))
  expect(screen.queryByText('Create "New"')).toBeNull()
  expect(screen.getByText("New")).toBeInTheDocument()
})

test("composition does not create an option and quickpick ignores creation", () => {
  const onSelect = jest.fn()
  const { container, rerender } = render(
    <Dropdown
        allowOptionCreation
        onSelect={onSelect}
        options={[]}
    />
  )
  typeQuery(container, "New")
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter", isComposing: true })
  expect(onSelect).not.toHaveBeenCalled()
  rerender(
    <Dropdown
        allowOptionCreation
        variant="quickpick"
    />
  )
  expect(container.querySelector(".dropdown_input")).toBeNull()
})

test.each([undefined, false])("creation %s leaves autocomplete and options unchanged", allowOptionCreation => {
  const { container } = render(
    <Dropdown
        allowOptionCreation={allowOptionCreation}
        options={options}
    />
  )
  expect(container.querySelector(".dropdown_input")).toBeNull()
  expect(screen.queryByText(/^Create "/)).toBeNull()
  expect(screen.getByText("Existing")).toBeInTheDocument()
})

test("option creation alone does not opt into native form submission", () => {
  const { container } = render(
    <form>
      <Dropdown
          allowOptionCreation
          name="tag"
          options={[]}
      />
    </form>
  )
  typeQuery(container, "New")
  fireEvent.click(screen.getByText('Create "New"'))
  expect(new FormData(container.querySelector("form")).has("tag")).toBe(false)
})

test("composition preserves legacy selection behavior when creation is disabled", () => {
  const onSelect = jest.fn()
  const { container } = render(
    <Dropdown
        autocomplete
        onSelect={onSelect}
        options={options}
    />
  )
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
  typeQuery(container, "New tag")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false)
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(onSelect).toHaveBeenLastCalledWith(createdOption("New tag"))
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(new FormData(container.querySelector("form")).get("tag")).toBe("New tag")
})

test("Enter on mount or a whitespace query does not select a static option", () => {
  const onSelect = jest.fn()
  const { container } = render(
    <Dropdown
        allowOptionCreation
        onSelect={onSelect}
        options={options}
    />
  )
  const input = container.querySelector(".dropdown_input")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(container.querySelector(".pb_dropdown_container")).toHaveClass("close")
  typeQuery(container, "   ")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).not.toHaveBeenCalled()
})

test("Enter confirms the Create row ahead of a partial static match", () => {
  const onSelect = jest.fn()
  const { container } = render(
    <Dropdown
        allowOptionCreation
        onSelect={onSelect}
        options={options}
    />
  )
  typeQuery(container, "Ex")
  fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter" })
  expect(onSelect).toHaveBeenCalledWith(createdOption("Ex"))
})

test("closing the menu with a pending query makes Enter available to the form", () => {
  const onSelect = jest.fn()
  const { container } = render(
    <Dropdown
        allowOptionCreation
        onSelect={onSelect}
        options={options}
    />
  )
  typeQuery(container, "New")
  const input = container.querySelector(".dropdown_input")
  fireEvent.keyDown(input, { key: "Escape" })
  expect(container.querySelector(".pb_dropdown_container")).toHaveClass("close")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).not.toHaveBeenCalled()
})

test("async creation leaves the following Enter available for submission", async () => {
  const onSelect = jest.fn()
  const loadOptions = jest.fn(() => Promise.resolve([]))
  const { container } = render(
    <Dropdown
        allowOptionCreation
        async
        loadOptions={loadOptions}
        onSelect={onSelect}
        options={options}
    />
  )
  typeQuery(container, "New tag")
  await waitFor(() => expect(screen.getByText('Create "New tag"')).toBeInTheDocument())
  const input = container.querySelector(".dropdown_input")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false)
  expect(onSelect).toHaveBeenLastCalledWith(createdOption("New tag"))
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).toHaveBeenCalledTimes(1)
})

test.each([
  { async: false, multiSelect: false },
  { async: false, multiSelect: true },
  { async: true, multiSelect: false },
  { async: true, multiSelect: true },
])("hovering the menu still permits Enter creation with %j", async settings => {
  const onSelect = jest.fn()
  const loadOptions = jest.fn(() => Promise.resolve(options))
  const { container } = render(
    <form>
      <Dropdown
          allowOptionCreation
          async={settings.async}
          closeOnClick="outside"
          enableFormSupport
          loadOptions={settings.async ? loadOptions : undefined}
          multiSelect={settings.multiSelect}
          name="tag"
          onSelect={onSelect}
          options={options}
      />
    </form>
  )
  typeQuery(container, "Ex")
  await waitFor(() => expect(screen.getByText('Create "Ex"')).toBeInTheDocument())
  fireEvent.mouseEnter(container.querySelector(".pb_dropdown_container"))
  expect(container.querySelector(".pb_dropdown_option_list_focused")).toBeNull()

  const input = container.querySelector(".dropdown_input")
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false)
  const expectedSelection = settings.multiSelect ? [createdOption("Ex")] : createdOption("Ex")
  expect(onSelect).toHaveBeenCalledTimes(1)
  expect(onSelect).toHaveBeenLastCalledWith(expectedSelection)

  const fieldName = settings.multiSelect ? "tag[]" : "tag"
  expect(new FormData(container.querySelector("form")).getAll(fieldName)).toEqual(["Ex"])
  expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true)
  expect(onSelect).toHaveBeenCalledTimes(1)
})

describe.each([false, true])("exact option matching with multiSelect=%s", multiSelect => {
  test.each(["ny", " NY ", "empire"])("keeps the existing option selectable for query %s", query => {
    const onSelect = jest.fn()
    const newYork = { id: "ny", label: "New York", value: "empire" }
    const { container } = render(
      <Dropdown
          allowOptionCreation
          multiSelect={multiSelect}
          onSelect={onSelect}
          options={[newYork]}
      />
    )
    typeQuery(container, query)
    expect(screen.getByText("New York")).toBeInTheDocument()
    expect(screen.queryByText(/^Create "/)).toBeNull()
    expect(fireEvent.keyDown(container.querySelector(".dropdown_input"), { key: "Enter" })).toBe(false)
    expect(onSelect).toHaveBeenCalledWith(multiSelect ? [newYork] : newYork)
  })
})

test.each([
  ["Create row", "New tag", 'Create "New tag"', "New tag", "New tag"],
  ["existing option", "Ex", "Existing", "Existing", "existing"],
])("uncontrolled single-select keeps the %s label and replaces it on the next character", (_kind, query, optionText, label, submitted) => {
  const onSelect = jest.fn()
  const { container } = render(
    <form>
      <Dropdown
          allowOptionCreation
          enableFormSupport
          name="tag"
          onSelect={onSelect}
          options={options}
      />
    </form>
  )
  const input = container.querySelector(".dropdown_input")
  const form = container.querySelector("form")
  typeQuery(container, query)
  fireEvent.click(screen.getByText(optionText))
  expect(input).toHaveValue(label)
  expect(new FormData(form).get("tag")).toBe(submitted)

  expect(fireEvent.keyDown(input, { key: "x" })).toBe(false)
  expect(input).toHaveValue("x")
  expect(onSelect).toHaveBeenLastCalledWith(null)
  expect(new FormData(form).get("tag")).toBe("")
})

test("static filtering stays label-only when option creation is disabled", () => {
  const { container } = render(
    <Dropdown
        allowOptionCreation={false}
        autocomplete
        options={[{ id: "ny", label: "New York", value: "empire" }]}
    />
  )
  typeQuery(container, "ny")
  expect(screen.queryByText("New York")).toBeNull()
  expect(screen.queryByText(/^Create "/)).toBeNull()
  typeQuery(container, "New")
  expect(screen.getByText("New York")).toBeInTheDocument()
})
