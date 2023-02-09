/* @flow */
import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import TextInput from '../pb_text_input/_text_input'

type PhoneNumberInputProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  disabled?: boolean,
  id: string,
  isValid?: () => boolean,
  label?: string,
  name?: string,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  preferredCountries?: string[],
  value?: string,
}

enum ValidationError {
  TooShort = 2,
  TooLong = 3,
};

const formatToGlobalCountryName = (countryName: string) => {
  return countryName.split('(')[0].trim()
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const {
    aria = {},
    className,
    data = {},
    disabled = false,
    id = '',
    isValid = () => Boolean, // TODO isValidNumber
    label = '',
    name = '',
    onChange = () => { void 0 },
    preferredCountries = ['us', 'br', 'ph', 'gb'],
    value = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_phone_number_input'), globalProps(props), className)

  const [inputValue, setInputValue] = useState(value)
  const [itiInit, setItiInit] = useState<any>() // FIX type
  const [error, setError] = useState('')

  const validateTooLongNumber = (itiInit: any) => { // FIX type
    const error = itiInit.getValidationError();

    if (error === ValidationError.TooLong) {
      const countryName = itiInit.getSelectedCountryData().name
      const globalCountryName = formatToGlobalCountryName(countryName)

      setError(`Invalid ${globalCountryName} phone number (too long)`)
    } else {
      setError('')
    }
  }

  const validateTooShortNumber = (itiInit: any) => { // FIX type
    const error = itiInit.getValidationError();

    if (error === ValidationError.TooShort) {
      const countryName = itiInit.getSelectedCountryData().name
      const globalCountryName = formatToGlobalCountryName(countryName)

      setError(`Invalid ${globalCountryName} phone number (too short)`)
    }
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`${itiInit.isValidNumber()}-${itiInit.getValidationError()}`)
    setInputValue(evt.target.value)
    validateTooLongNumber(itiInit)
    onChange(evt)
    isValid(itiInit.isValidNumber())
  }

  useEffect(() => {
    const input = document.querySelector(`#${id}`)
    const itiInit = intlTelInput(input, {
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
        separateDialCode: true,
        preferredCountries,
        allowDropdown: !disabled
      }
    )

    input.addEventListener("countrychange", () => validateTooLongNumber(itiInit));
    setItiInit(itiInit)
  }, [])

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classes}
    >
      <TextInput
        disabled={disabled}
        id={id}
        name={name}
        onBlur={() => validateTooShortNumber(itiInit)}
        onChange={handleOnChange}
        value={inputValue}
        error={error}
        label={label}
      />
    </div>
  )
}

export default PhoneNumberInput
