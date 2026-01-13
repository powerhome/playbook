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

const TextInputCreditCardMask = (props) => {
  const [creditCard, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="creditCard"
        onChange={handleOnChange}
        value={creditCard}
        {...props}
    />
  )
}

test('returns masked credit card value', () => {
  render(
    <TextInputCreditCardMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox')

  fireEvent.change(input, { target: { value: '1234567890123456' } })

  expect(input.value).toBe('1234 5678 9012 3456')

  fireEvent.change(input, { target: { value: '1234' } })

  expect(input.value).toBe('1234')

  fireEvent.change(input, { target: { value: '' } })

  expect(input.value).toBe('')
})

const TextInputCVVMask = (props) => {
  const [cvv, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        mask="cvv"
        onChange={handleOnChange}
        value={cvv}
        {...props}
    />
  )
}

test('returns masked CVV value', () => {
  render(
    <TextInputCVVMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)

  const input = within(kit).getByRole('textbox')

  fireEvent.change(input, { target: { value: '1234' } })

  expect(input.value).toBe('1234')

  fireEvent.change(input, { target: { value: '123' } })

  expect(input.value).toBe('123')

  fireEvent.change(input, { target: { value: '' } })

  expect(input.value).toBe('')
})

test('adds autocomplete string attribute', () => {
  render(
    <TextInput
        autoComplete="family-name"
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = within(kit).getByRole('textbox')
  expect(input).toHaveAttribute("autocomplete", "family-name")
})

test('adds autocomplete "off" attribute', () => {
  render(
    <TextInput
        autoComplete={false}
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = within(kit).getByRole('textbox')
  expect(input).toHaveAttribute("autocomplete", "off")
})

test('does not add autocomplete attribute otherwise', () => {
  render(
    <TextInput
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = within(kit).getByRole('textbox')
  expect(input).not.toHaveAttribute("autocomplete")
})

test('renders required indicator asterisk when requiredIndicator is true', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        label="Email Address"
        requiredIndicator
    />
  )

  const kit = screen.getByTestId(testId)
  const label = within(kit).getByText(/Email Address/)
  
  expect(label).toBeInTheDocument()
  expect(kit).toHaveTextContent('*') 
})

const TextInputEmojiMask = (props) => {
  const [value, setValue] = useState('')
  const handleOnChange = ({ target }) => {
    setValue(target.value)
  }

  return (
    <TextInput
        emojiMask
        onChange={handleOnChange}
        value={value}
        {...props}
    />
  )
}

test('removes emoji characters when emojiMask is enabled', () => {
  render(
    <TextInputEmojiMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = within(kit).getByRole('textbox')

  fireEvent.change(input, { target: { value: 'Hello 👋 World 🌍' } })
  expect(input.value).toBe('Hello  World ')

  fireEvent.change(input, { target: { value: '😀😂🎉' } })
  expect(input.value).toBe('')

  fireEvent.change(input, { target: { value: 'Hello World' } })
  expect(input.value).toBe('Hello World')
})

test('allows accented characters when emojiMask is enabled', () => {
  render(
    <TextInputEmojiMask
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = within(kit).getByRole('textbox')

  fireEvent.change(input, { target: { value: 'Café résumé naïve' } })
  expect(input.value).toBe('Café résumé naïve')

  fireEvent.change(input, { target: { value: 'àëǒüñ' } })
  expect(input.value).toBe('àëǒüñ')
})
