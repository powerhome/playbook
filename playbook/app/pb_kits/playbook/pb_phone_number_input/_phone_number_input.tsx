import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import classnames from 'classnames'

import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/js/utils.js'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import TextInput from '../pb_text_input/_text_input'
import { Callback } from '../types'
import { isEmpty } from '../utilities/object'

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
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  initialCountry?: string,
  isValid?: (valid: boolean) => void,
  label?: string,
  name?: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  onValidate?: Callback<boolean, void>,
  onlyCountries: string[],
  preferredCountries?: string[],
  required?: boolean,
  value?: string,
}

enum ValidationError {
  TooShort = 2,
  TooLong = 3,
  MissingAreaCode = 4,
  SomethingWentWrong = -99
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
  // eslint-disable-next-line no-useless-escape
  return /^[()+\-\ .\d]*$/g.test(value)
}

const PhoneNumberInput = (props: PhoneNumberInputProps, ref?: React.MutableRefObject<unknown>) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    disabled = false,
    htmlOptions = {},
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
    onValidate = () => null,
    onlyCountries = [],
    required = false,
    preferredCountries = [],
    value = "",
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss("pb_phone_number_input"),
    globalProps(props),
    className
  )

  const inputRef = useRef<HTMLInputElement>()
  const [inputValue, setInputValue] = useState(value)
  const [itiInit, setItiInit] = useState<any>()
  const [error, setError] = useState(props.error)
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()

  useEffect(() => {
    if (error?.length > 0) {
      onValidate(false)
    } else {
      onValidate(true)
    }
  }, [error, onValidate])

  /*
    useImperativeHandle exposes the kit's input element to a parent component via a ref.
    See the Playbook docs for use cases.
    Read: https://react.dev/reference/react/useImperativeHandle
  */
  useImperativeHandle(ref, () => {
    return {
      clearField() {
        setInputValue("")
        setError("")
      },
      inputNode() {
        return inputRef.current
      }
    }
  })

  const showFormattedError = (reason = '') => {
    const countryName = itiInit.getSelectedCountryData().name
    const reasonText = reason.length > 0 ? ` (${reason})` : ''
    setError(`Invalid ${countryName} phone number${reasonText}`)
    return true
  }

  const validateTooLongNumber = (itiInit: any) => {
    if (!itiInit) return
    if (itiInit.getValidationError() === ValidationError.TooLong) {
      return showFormattedError('too long')
    } else {
      setError('')
    }
  }

  const validateTooShortNumber = (itiInit: any) => {
    if (!itiInit) return
    if (itiInit.getValidationError() === ValidationError.TooShort) {
      return showFormattedError('too short')
    } else {
      if (inputValue.length === 1) {
        return showFormattedError('too short')
      } else {
        setError('')
      }
    }
  }

  const validateOnlyNumbers = (itiInit: any) => {
    if (!itiInit) return
    if (inputValue && !containOnlyNumbers(inputValue)) {
      return showFormattedError('enter numbers only')
    }
  }

  const validateUnhandledError = (itiInit: any) => {
    if (!required || !itiInit) return
    if (itiInit.getValidationError() === ValidationError.SomethingWentWrong) {
      if (inputValue.length === 1) {
        return showFormattedError('too short')
      } else if (inputValue.length === 0) {
        setError('Missing phone number')
        return true
      } else {
        return showFormattedError()
      }
    }
  }

  const validateMissingAreaCode = (itiInit: any) => {
    if (!required || !itiInit) return
    if (itiInit.getValidationError() === ValidationError.MissingAreaCode) {
      showFormattedError('missing area code')
      return true
    }
  }

  const validateErrors = () => {
    if (itiInit) isValid(itiInit.isValidNumber())
    if (validateOnlyNumbers(itiInit)) return
    if (validateTooLongNumber(itiInit)) return
    if (validateTooShortNumber(itiInit)) return
    if (validateUnhandledError(itiInit)) return
    if (validateMissingAreaCode(itiInit)) return
  }

  const getCurrentSelectedData = (itiInit: any, inputValue: string) => {
    return { ...itiInit.getSelectedCountryData(), number: inputValue }
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value)
    const phoneNumberData = getCurrentSelectedData(itiInit, evt.target.value)
    setSelectedData(phoneNumberData)
    onChange(phoneNumberData)
    isValid(itiInit.isValidNumber())
  }

  // Separating Concerns as React Docs Recommend
  // This also Fixes things for our react_component rendering on the Rails Side
  useEffect(formatAllCountries, [])

  useEffect(() => {
    const telInputInit = intlTelInput(inputRef.current, {
      separateDialCode: true,
      preferredCountries,
      allowDropdown: !disabled,
      autoInsertDialCode: false,
      initialCountry,
      onlyCountries
    })

    inputRef.current.addEventListener("countrychange", (evt: Event) => {
      const phoneNumberData = getCurrentSelectedData(telInputInit, (evt.target as HTMLInputElement).value)
      setSelectedData(phoneNumberData)
      onChange(phoneNumberData)
      validateErrors()
    })

    inputRef.current.addEventListener("open:countrydropdown", () => setDropDownIsOpen(true))
    inputRef.current.addEventListener("close:countrydropdown", () => setDropDownIsOpen(false))

    setItiInit(telInputInit)
  }, [])

  let textInputProps: {[key: string]: any} = {
    className: dropDownIsOpen ? 'dropdown_open' : '',
    dark,
    "data-phone-number": JSON.stringify(selectedData),
    disabled,
    error,
    type: 'tel',
    id,
    label,
    name,
    onBlur: validateErrors,
    onChange: handleOnChange,
    value: inputValue
  }

  let wrapperProps: Record<string, unknown> = { className: classes }

  if (!isEmpty(aria)) textInputProps = {...textInputProps, ...ariaProps}
  if (!isEmpty(data)) wrapperProps = {...wrapperProps, ...dataProps}
  if (required) textInputProps.required = true

  return (
    <div
        {...wrapperProps}
        {...htmlProps}
    >
      <TextInput
          ref={
            inputNode => {
              ref ? ref.current = inputNode : null
              inputRef.current = inputNode
            }
          }
          {...textInputProps}
      />
    </div>
  )
}

export default forwardRef(PhoneNumberInput)
