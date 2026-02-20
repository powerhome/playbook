import React from 'react'
import { render, screen, fireEvent, within } from '../utilities/test-utils'

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
    expect(screen.getByText('Hour', { selector: '.pb_caption_kit_sm_lighter' })).toBeInTheDocument()
  })

  test('does not open dropdown on input click when disabled', () => {
    render(<TimePicker disabled />)
    const input = screen.getByPlaceholderText('Select Time')
    fireEvent.click(input)
    expect(screen.queryByText('Hour', { selector: '.pb_caption_kit_sm_lighter' })).not.toBeInTheDocument()
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

  test('renders required indicator asterisk when requiredIndicator is true', () => {
    render(
      <TimePicker
          data={{ testid: 'required-indicator-picker' }}
          label="Select Time"
          requiredIndicator
      />
    )
    const kit = screen.getByTestId('required-indicator-picker')
    const label = within(kit).getByText(/Select Time/)
    
    expect(label).toBeInTheDocument()
    expect(kit).toHaveTextContent('*')
  })

  test('requiredIndicator works independently of required prop', () => {
    render(
      <TimePicker
          data={{ testid: 'indicator-without-required' }}
          label="Select Time"
          requiredIndicator
      />
    )
    const kit = screen.getByTestId('indicator-without-required')
    
    expect(kit).toHaveTextContent('*')
    const input = screen.getByPlaceholderText('Select Time')
    expect(input).not.toHaveAttribute('required')
  })

  test('requiredIndicator and required can be used together', () => {
    render(
      <TimePicker
          data={{ testid: 'both-props-picker' }}
          label="Select Time"
          required
          requiredIndicator
      />
    )
    const kit = screen.getByTestId('both-props-picker')
    const input = screen.getByPlaceholderText('Select Time')
    
    expect(kit).toHaveTextContent('*')
    expect(input).toHaveAttribute('required')
  })
})
