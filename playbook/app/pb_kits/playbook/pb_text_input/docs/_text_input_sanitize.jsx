import React, { useState } from 'react'

import TextInput from '../../pb_text_input/_text_input'

const TextInputSanitize = (props) => {
  const ref = React.createRef()

  const [currency, setCurrency] = useState('')
  const [sanitizedCurrency, setSanitizedCurrency] = useState('')
  const handleOnChangeSanitizeCurrency = ({ target }, sanitizedValue) => {
    setCurrency(target.value)
    setSanitizedCurrency(sanitizedValue);
  }

  const [creditCard, setCreditCard] = useState('')
  const [sanitizedCreditCard, setSanitizedCreditCard] = useState('')
  const handleOnChangeSanitizeCC = ({ target }, sanitizedValue) => {
    setCreditCard(target.value)
    setSanitizedCreditCard(sanitizedValue);
  }

  const [ssn, setSSN] = useState('')
  const [sanitizedSSN, setSanitizedSSN] = useState('')
  const handleOnChangeSanitizeSSN = ({ target }, sanitizedValue) => {
    setSSN(target.value)
    setSanitizedSSN(sanitizedValue);
  }

  return (
    <div>
      <TextInput
          label="Currency"
          mask="currency"
          onChange={handleOnChangeSanitizeCurrency}
          placeholder="Enter Amount"
          ref={ref}
          value={currency}
          {...props}
      />

      {currency !== "" && (
        <React.Fragment>{`The masked value is: ${currency}`}</React.Fragment>
      )}
      <br />
      {sanitizedCurrency !== "" && (
        <React.Fragment>{`The sanitized value is: ${sanitizedCurrency}`}</React.Fragment>
      )}

      <br />
      <br />

      <TextInput
          label="Credit Card"
          mask="creditCard"
          onChange={handleOnChangeSanitizeCC}
          placeholder="Enter Card"
          ref={ref}
          value={creditCard}
          {...props}
      />

      {creditCard !== "" && (
        <React.Fragment>{`The masked value is: ${creditCard}`}</React.Fragment>
      )}
      <br />
      {sanitizedCreditCard !== "" && (
        <React.Fragment>{`The sanitized value is: ${sanitizedCreditCard}`}</React.Fragment>
      )}

      <br />
      <br />

      <TextInput
          label="SSN"
          mask="ssn"
          onChange={handleOnChangeSanitizeSSN}
          placeholder="Enter Amount"
          ref={ref}
          value={ssn}
          {...props}
      />

      {ssn !== "" && (
        <React.Fragment>{`The masked value is: ${ssn}`}</React.Fragment>
      )}
      <br />
      {sanitizedSSN !== "" && (
        <React.Fragment>{`The sanitized value is: ${sanitizedSSN}`}</React.Fragment>
      )}
    </div>
  )
}

export default TextInputSanitize
