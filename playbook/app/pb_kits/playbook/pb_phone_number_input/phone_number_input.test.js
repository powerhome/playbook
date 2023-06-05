import React from 'react'
import { render, screen } from '../utilities/test-utils'
import PhoneNumberInput from './_phone_number_input'

const testId = "phoneNumberInput"

test('should be disabled', () => {
  const props = {
    disabled: true,
    id: testId,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByRole("textbox")
  expect(kit).toBeDisabled()
})

test('should be enabled by default', () => {
  const props = {
    id: testId,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByRole("textbox")
  expect(kit).not.toBeDisabled()
})

test('should have label', () => {
  const label = 'Phone Number'
  const props = {
    id: testId,
    label,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByText(label)
  expect(kit).toBeInTheDocument()
})

test('should pass data prop', () => {
  const props = {
    data: { testid: testId },
    id: testId,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
  const className = 'custom-class-name'
  const props = {
    className,
    data: { testid: testId },
    id: testId,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(className)
})

test('should pass value prop', () => {
  const value = '1234567890'
  const props = {
    id: testId,
    value,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByRole("textbox")
  expect(kit).toHaveDisplayValue(value)
})

test('should provide validation callback', () => {
  const value = '1234567890'
  const props = {
    id: testId,
    value,
  }

  render(<PhoneNumberInput {...props} />)
  const kit = screen.getByRole("textbox")
  expect(kit).toHaveDisplayValue(value)
})
