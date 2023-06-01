import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'

import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import 'intl-tel-input/build/js/utils.js'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import TextInput from '../pb_text_input/_text_input'

declare global {
  interface Window {
    intlTelInputGlobals: any
  }
}

type PhoneNumberInputProps = {
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  errorMsg?: string,
  id?: string,
  initialCountry?: string,
  isValid?: (valid: boolean) => void,
  label?: string,
  name?: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  onValidate?: (valid: boolean) => void,
  onlyCountries: string[],
  preferredCountries?: string[],
  required?: boolean,
  value?: string,
}

enum ValidationError {
  TooShort = 2,
  TooLong = 3,
}

const formatToGlobalCountryName = (countryName: string) => {
  return countryName.split("(")[0].trim()
}

const formatAllCountries = () => {
  const countryData = window.intlTelInputGlobals.getCountryData()

  for (let i = 0; i < countryData.length; i++) {
    const country = countryData[i]
    country.name = formatToGlobalCountryName(country.name)
  }
}

formatAllCountries()

const containOnlyNumbers = (value: string) => {
  return /^[()+\-\ .\d]*$/g.test(value)
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    disabled = false,
    errorMsg,
    id = "",
    initialCountry = "",
    isValid = () => {
      void 0
    },
    label = "",
    name = "",
    onChange = () => {
      void 0
    },
    onlyCountries = [],
    required = false,
    preferredCountries = [],
    value = "",
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss("pb_phone_number_input"),
    globalProps(props),
    className
  )

  const inputRef = useRef<HTMLInputElement>()
  const [inputValue, setInputValue] = useState(value)
  const [itiInit, setItiInit] = useState<any>()
  const [error, setError] = useState(errorMsg)
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()

  useEffect(() => {

  }, [error])

  const validateTooLongNumber = (itiInit: any) => {
    const error = itiInit.getValidationError()

    if (error === ValidationError.TooLong) {
      const countryName = itiInit.getSelectedCountryData().name
      setError(`Invalid ${countryName} phone number (too long)`)
    } else {
      setError("")
    }
  }

  const validateTooShortNumber = () => {
    const error = itiInit.getValidationError()

    if (error === ValidationError.TooShort) {
      const countryName = itiInit.getSelectedCountryData().name
      setError(`Invalid ${countryName} phone number (too short)`)
    }
  }

  const validateOnlyNumbers = () => {
    if (inputValue && !containOnlyNumbers(inputValue)) {
      setError("Invalid phone number. Enter numbers only.")
    }
  }

  const validateErrors = () => {
    validateTooShortNumber()
    validateOnlyNumbers()
  }

  const getCurrentSelectedData = (itiInit: any, inputValue: string) => {
    return { ...itiInit.getSelectedCountryData(), number: inputValue }
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value)
    validateTooLongNumber(itiInit)
    const phoneNumberData = getCurrentSelectedData(itiInit, evt.target.value)
    setSelectedData(phoneNumberData)
    onChange(phoneNumberData)
    isValid(itiInit.isValidNumber())
  }

  // Separating Concerns as React Docs Recommend
  // This also Fixes things for our react_component rendering on the Rails Side
  useEffect(formatAllCountries, [])

  useEffect(() => {
    const telInputInit = new intlTelInput(inputRef.current, {
      separateDialCode: true,
      preferredCountries,
      allowDropdown: !disabled,
      initialCountry,
      onlyCountries,
    })

    inputRef.current.addEventListener("countrychange", (evt: Event) => {
      validateTooLongNumber(telInputInit)
      const phoneNumberData = getCurrentSelectedData(telInputInit, (evt.target as HTMLInputElement).value)
      setSelectedData(phoneNumberData)
      onChange(phoneNumberData)
    })

    inputRef.current.addEventListener("open:countrydropdown", () => setDropDownIsOpen(true))
    inputRef.current.addEventListener("close:countrydropdown", () => setDropDownIsOpen(false))

    setItiInit(telInputInit)
  }, [])

  const textInputProps: {[key: string]: any} = {
    aria,
    className: dropDownIsOpen ? 'dropdown_open' : '',
    dark,
    "data-phone-number": JSON.stringify(selectedData),
    disabled,
    error,
    id,
    label,
    name,
    onBlur: validateErrors,
    onChange: handleOnChange,
    value: inputValue
  }

  if (required) textInputProps.required = true

  return (
    <div
        className={classes}
        {...ariaProps}
        {...dataProps}
    >
      <TextInput
          ref={inputRef}
          {...textInputProps}
      />
    </div>
  )
}

export default PhoneNumberInput
