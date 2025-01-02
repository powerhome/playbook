import React, { useState } from 'react'
import { render, screen, fireEvent, within } from '../utilities/test-utils'

import TextInput from './_text_input'

const testId = 'text-input1',
  kitClass = 'pb_text_input_kit'

test('returns namespaced class name', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} mb_sm`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        className="additional_class"
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} additional_class`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        dark
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        error="Please enter a valid email"
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} error`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        dark
        data={{ testid: testId }}
        error="Please enter a valid email"
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark error`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        label="First Name"
        marginBottom="lg"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} mb_lg`)
})


const TextInputCurrencyMask = (props) => {
  const [currency, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="currency"
        onChange={handleOnChange}
        value={currency}
        {...props}
    />
  )
}

test('returns masked currency value', () => {
  render(
    <TextInputCurrencyMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox');

  fireEvent.change(input, { target: { value: '123456' } });

  expect(input.value).toBe('$1,234.56')

  fireEvent.change(input, { target: { value: '1' } });

  expect(input.value).toBe('$0.01')

  fireEvent.change(input, { target: { value: '' } });

  expect(input.value).toBe('')
})

const TextInputZipCodeMask = (props) => {
  const [zipCode, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="zipCode"
        onChange={handleOnChange}
        value={zipCode}
        {...props}
    />
  )
}

test('returns masked zip code value', () => {
  render(
    <TextInputZipCodeMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox');

  fireEvent.change(input, { target: { value: '123456' } });

  expect(input.value).toBe('12345')
})

const TextInputPostalCodeMask = (props) => {
  const [postalCode, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="postalCode"
        onChange={handleOnChange}
        value={postalCode}
        {...props}
    />
  )
}

test('returns masked postal code value', () => {
  render(
    <TextInputPostalCodeMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox');

  fireEvent.change(input, { target: { value: '123456789' } });

  expect(input.value).toBe('12345-6789')
})

const TextInputSSNMask = (props) => {
  const [ssn, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="ssn"
        onChange={handleOnChange}
        value={ssn}
        {...props}
    />
  )
}

test('returns masked ssn value', () => {
  render(
    <TextInputSSNMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox');

  fireEvent.change(input, { target: { value: '123456789' } });

  expect(input.value).toBe('123-45-6789')
})
