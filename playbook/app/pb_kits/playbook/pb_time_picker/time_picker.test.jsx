import React from 'react'
import { render, screen, fireEvent } from '../utilities/test-utils'

import { TimePicker } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('renders time picker with default values', () => {
  render(<TimePicker data={{ testid: 'time-picker' }} />)
  expect(screen.getByTestId('time-picker')).toBeInTheDocument()
})

test('renders hour and minute inputs', () => {
  render(<TimePicker />)
  const hourInput = screen.getByDisplayValue(/^\d{1,2}$/)
  const minuteInput = screen.getByDisplayValue(/^\d{2}$/)
  expect(hourInput).toBeInTheDocument()
  expect(minuteInput).toBeInTheDocument()
})

test('renders AM/PM cards', () => {
  render(<TimePicker />)
  expect(screen.getByText('AM')).toBeInTheDocument()
  expect(screen.getByText('PM')).toBeInTheDocument()
})

test('renders default label', () => {
  render(<TimePicker />)
  expect(screen.getByText('Time Picker')).toBeInTheDocument()
})

test('renders custom label when provided', () => {
  render(<TimePicker label="Select Time" />)
  expect(screen.getByText('Select Time')).toBeInTheDocument()
})

test('renders timezone when showTimezone is true', () => {
  render(<TimePicker showTimezone />)
  expect(screen.getByText(/\(/)).toBeInTheDocument() // Timezone text contains parentheses
})

test('calls onChange when time is changed', () => {
  const handleChange = jest.fn()
  render(<TimePicker onChange={handleChange} />)
  
  const hourInput = screen.getAllByRole('spinbutton')[0]
  fireEvent.change(hourInput, { target: { value: '2' } })
  
  expect(handleChange).toHaveBeenCalled()
})
