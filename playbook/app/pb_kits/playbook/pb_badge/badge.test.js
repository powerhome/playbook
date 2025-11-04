import React from 'react'
import { cleanup, render, screen } from '../utilities/test-utils'

import Badge from './_badge'

const testId = "badge"

test('default class name', () => {
  render(
    <Badge
        data={{ testid: testId }}
        text="+1"
    />
  )

  const kit = screen.getByTestId(testId)

  expect(kit).toHaveClass('pb_badge_kit_neutral')
})

test('primary class name', () => {
  render(
    <Badge
        data={{ testid: testId }}
        text="+1"
        variant="primary"
    />
  )

  const kit = screen.getByTestId(testId)

  expect(kit).toHaveClass('pb_badge_kit_primary')
})

test('displays text content', () => {
  render(
    <Badge
        text="+1"
        variant="primary"
    />
  )

  const text = screen.getByText("+1")
  expect(text).toBeInTheDocument()
})

test('displays rounded corners', () => {
  render(
    <Badge
        data={{ testid: testId }}
        rounded
        text="+1"
        variant="primary"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_badge_kit_primary_rounded')
})

test('displays color variants', () => {
  [
    "warning",
    "error",
    "info"
  ].forEach((colorVariant) => {
    render(
      <Badge
          data={{ testid: testId }}
          text={colorVariant}
          variant={colorVariant}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_badge_kit_${colorVariant}`)

    cleanup()
  })
})

test('displays success variant', () => {
    render(
      <Badge
          data={{ testid: testId }}
          text={"success"}
          variant={"success"}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_badge_kit_success_sm
    `)

    cleanup()

})

test('displays notification variants', () => {
  [
    "notification",
    "notificationError"
  ].forEach((colorVariant) => {
    render(
      <Badge
          data={{ testid: testId }}
          text={colorVariant}
          variant={colorVariant}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_badge_kit_${colorVariant === "notificationError" ? "notification_error" : "notification"}`)

    cleanup()
  })
})

test('should allow tabIndex to be set', () => {
  render(
    <Badge
        data={{ testid: testId }}
        tabIndex={0}
        text="+1"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveAttribute('tabIndex', '0')
})