import React from 'react'
import { render, screen, fireEvent } from '../utilities/test-utils'

import TimePicker from './_time_picker'

describe('TimePicker', () => {
  test('renders with default props', () => {
    render(<TimePicker data={{ testid: 'time-picker' }} />)
    expect(screen.getByTestId('time-picker')).toBeInTheDocument()
  })

  test('renders with custom label', () => {
    render(<TimePicker label="Appointment Time" />)
    expect(screen.getByText('Appointment Time')).toBeInTheDocument()
  })

  test('renders label as accessible label element with htmlFor', () => {
    render(
      <TimePicker
          id="test-picker"
          label="Select Time"
      />
    )
    const label = screen.getByText('Select Time').closest('label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-picker-input')
  })

  test('renders with error state', () => {
    render(
      <TimePicker
          data={{ testid: 'error-picker' }}
          error="Please select a valid time"
      />
    )
    expect(screen.getByTestId('error-picker')).toHaveClass('error')
    expect(screen.getByText('Please select a valid time')).toBeInTheDocument()
  })

  test('renders with disabled state', () => {
    render(
      <TimePicker
          data={{ testid: 'disabled-picker' }}
          disabled
          label="Disabled Picker"
      />
    )
    expect(screen.getByTestId('disabled-picker')).toHaveClass('disabled')
    const input = screen.getByPlaceholderText('Select Time')
    expect(input).toBeDisabled()
  })

  test('renders with default time value', () => {
    render(<TimePicker defaultTime="14:30" />)
    const input = screen.getByPlaceholderText('Select Time')
    expect(input).toHaveValue('2:30 PM')
  })

  test('renders with default time in 24-hour format', () => {
    render(
      <TimePicker
          defaultTime="14:30"
          timeFormat="24hour"
      />
    )
    const input = screen.getByPlaceholderText('Select Time')
    expect(input).toHaveValue('14:30')
  })

  test('opens dropdown on input click when not disabled', () => {
    render(<TimePicker data={{ testid: 'clickable-picker' }} />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    expect(screen.getByText('Select Time', { selector: '.pb_caption_kit_md' })).toBeInTheDocument()
  })

  test('does not open dropdown on input click when disabled', () => {
    render(<TimePicker disabled />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    expect(screen.queryByText('Select Time', { selector: '.pb_caption_kit_md' })).not.toBeInTheDocument()
  })

  test('renders with required attribute', () => {
    render(<TimePicker required />)
    const input = screen.getByPlaceholderText('Select Time')
    expect(input).toHaveAttribute('required')
  })

  test('renders timezone when showTimezone is true', () => {
    render(<TimePicker showTimezone />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    // Timezone text should contain parentheses like "EST (Eastern Standard Time)"
    const timezoneElement = screen.getByText(/\(.*Time.*\)/)
    expect(timezoneElement).toBeInTheDocument()
  })

  test('renders 24-hour format without AM/PM selectors', () => {
    render(<TimePicker timeFormat="24hour" />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    expect(screen.queryByText('AM')).not.toBeInTheDocument()
    expect(screen.queryByText('PM')).not.toBeInTheDocument()
  })

  test('renders 12-hour format with AM/PM selectors', () => {
    render(<TimePicker timeFormat="AMPM" />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    expect(screen.getByText('AM')).toBeInTheDocument()
    expect(screen.getByText('PM')).toBeInTheDocument()
  })
})
