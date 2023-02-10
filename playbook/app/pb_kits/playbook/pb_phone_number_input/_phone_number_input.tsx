/* @flow */
import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import TextInput from '../pb_text_input/_text_input'

declare global {
  interface Window {
    intlTelInputGlobals: any;
  }
}

type PhoneNumberInputProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  disabled?: boolean,
  id?: string,
  initialCountry?: string,
  isValid?: (valid: boolean) => void,
  label?: string,
  name?: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  onlyCountries: string[],
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

const formatAllCountries = () => {
  let countryData = window.intlTelInputGlobals.getCountryData()
  for (let i = 0; i < countryData.length; i++) {
    let country = countryData[i]
    country.name = formatToGlobalCountryName(country.name)
  }
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const {
    aria = {},
    className,
    data = {},
    disabled = false,
    id = '',
    initialCountry = '',
    isValid = () => {void 0 },
    label = '',
    name = '',
    onChange = () => { void 0 },
    onlyCountries = [],
    preferredCountries = [],
    value = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_phone_number_input'), globalProps(props), className)

  const inputRef = useRef<HTMLInputElement>()
  const [inputValue, setInputValue] = useState(value)
  const [itiInit, setItiInit] = useState<any>()
  const [error, setError] = useState('')

  const validateTooLongNumber = (itiInit: any) => {
    const error = itiInit.getValidationError();

    if (error === ValidationError.TooLong) {
      const countryName = itiInit.getSelectedCountryData().name
      setError(`Invalid ${countryName} phone number (too long)`)
    } else {
      setError('')
    }
  }

  const validateTooShortNumber = (itiInit: any) => {
    const error = itiInit.getValidationError();

    if (error === ValidationError.TooShort) {
      const countryName = itiInit.getSelectedCountryData().name
      setError(`Invalid ${countryName} phone number (too short)`)
    }
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value)
    validateTooLongNumber(itiInit)
    onChange(evt)
    isValid(itiInit.isValidNumber())
  }

  useEffect(() => {
    formatAllCountries()

    const itiInit = intlTelInput(inputRef.current, {
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
        separateDialCode: true,
        preferredCountries,
        allowDropdown: !disabled,
        initialCountry,
        onlyCountries,
      }
    )
    
    inputRef.current.addEventListener("countrychange", () => validateTooLongNumber(itiInit));
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
        ref={inputRef}
        value={inputValue}
        error={error}
        label={label}
      />
    </div>
  )
}

export default PhoneNumberInput
