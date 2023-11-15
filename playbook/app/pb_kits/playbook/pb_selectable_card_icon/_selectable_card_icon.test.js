import React, { useState } from "react"
import { render, screen } from "../utilities/test-utils"

import SelectableCardIcon from "./_selectable_card_icon"

const testId = "selectableCardIcon"
const className = "custom-class-name"

const SelectableCardIconDefault = () => {
  const [selected, setSelected] = useState(true)

  return (
    <SelectableCardIcon
      aria={{ label: testId }}
      bodyText="Export"
      checked={selected}
      className={className}
      data={{ testid: testId }}
      icon="chart-line"
      inputId={1}
      onChange={() => setSelected(!selected)}
      titleText="Quarterly Report"
    />
  )
}

test("should pass data prop", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
})

test("should pass className prop", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(className)
})

test("should pass aria prop", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute("aria-label", testId)
})

test("should be checked", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("pb_selectable_card_icon_kit_checked_enabled")
})

test("should not be disabled", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("pb_selectable_card_icon_kit_checked_enabled")
})

test("should render body text prop", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByText("Export")
  expect(kit).toBeInTheDocument()
})

test("should render title text prop", () => {
  render(<SelectableCardIconDefault />)
  const kit = screen.getByText("Quarterly Report")
  expect(kit).toBeInTheDocument()
})
