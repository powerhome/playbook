import React from 'react'
import { render, screen } from '../utilities/test-utils'
import Pill from './_pill'

const testId = 'pill'

test('should render classname', () => {
  render(
    <Pill
        data={{ testid: testId }}
        text="test"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_neutral_lowercase')
})

test('displays text content', () => {
  render(
    <Pill
        data={{ testid: testId }}
        text="test"
    />
  )

  const text = screen.getByText('test')
  expect(text).toBeInTheDocument()
})

test('displays variant', () => {
  render(
    <Pill
        data={{ testid: testId }}
        text="test"
        variant="success"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_success_lowercase')
})

test('displays size sm', () => {
  render(
    <Pill
        data={{ testid: testId }}
        size="sm"
        text="test"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_neutral_lowercase_sm')
})

test('displays textTransform none', () => {
  render(
    <Pill
        data={{ testid: testId }}
        text="TEST"
        textTransform="none"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_neutral_none')
})

test('displays size sm with variant and textTransform', () => {
  render(
    <Pill
        data={{ testid: testId }}
        size="sm"
        text="Success"
        textTransform="none"
        variant="success"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_success_none_sm')
})

test('displays notification as primary by default', () => {
  render(
    <Pill
        data={{ testid: testId }}
        notification
        text="1"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_primary_lowercase_notification')
})

test('displays notification as primary when variant is not error', () => {
  render(
    <Pill
        data={{ testid: testId }}
        notification
        text="1"
        variant="success"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_primary_lowercase_notification')
})

test('displays notification with error variant', () => {
  render(
    <Pill
        data={{ testid: testId }}
        notification
        text="1"
        variant="error"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_error_lowercase_notification')
})

test('displays notification with size sm', () => {
  render(
    <Pill
        data={{ testid: testId }}
        notification
        size="sm"
        text="1"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_primary_lowercase_notification_sm')
})

test('displays notification with size sm, variant, and textTransform', () => {
  render(
    <Pill
        data={{ testid: testId }}
        notification
        size="sm"
        text="Error"
        textTransform="none"
        variant="error"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_pill_kit_error_none_notification_sm')
})
