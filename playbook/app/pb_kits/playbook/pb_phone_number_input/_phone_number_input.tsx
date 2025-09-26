import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import classnames from 'classnames'

import intlTelInput from 'intl-tel-input/build/js/intlTelInputWithUtils.js'

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
  hiddenInputs?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  initialCountry?: string,
  isValid?: (valid: boolean) => void,
  label?: string,
  name?: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  onValidate?: Callback<boolean, void>,
  onlyCountries: string[],
  excludeCountries: string[],
  preferredCountries?: string[],
  required?: boolean,
  value?: string,
  formatAsYouType?: boolean,
  strictMode?: boolean,
  countrySearch?: boolean,
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
  const countryData = intlTelInput.getCountryData()

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

const PhoneNumberInput = (props: PhoneNumberInputProps, ref?: React.Ref<unknown>) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    disabled = false,
    hiddenInputs = false,
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
    excludeCountries = [],
    required = false,
    preferredCountries = [],
    value = "",
    formatAsYouType = false,
    strictMode = false,
    countrySearch = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss("pb_phone_number_input"),
    globalProps(props),
    className
  )

  const inputRef = useRef<HTMLInputElement | null>(null)
  const itiRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null); // Add wrapper ref
  const [inputValue, setInputValue] = useState(value)
  const [error, setError] = useState(props.error)
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const [hasTyped, setHasTyped] = useState(false)

  // Function to update validation state on the wrapper element
  // Only applies when input is required
  const updateValidationState = (hasError: boolean) => {
    if (wrapperRef.current && required) {
      if (hasError) {
        wrapperRef.current.setAttribute('data-pb-phone-validation-error', 'true')
      } else {
        wrapperRef.current.removeAttribute('data-pb-phone-validation-error')
      }
    } else if (wrapperRef.current && !required) {
      // Always clear validation state if field is not required
      wrapperRef.current.removeAttribute('data-pb-phone-validation-error')
    }
  }

  useEffect(() => {
    const hasError = (error ?? '').length > 0
    if (hasError) {
      onValidate(false)
    } else {
      onValidate(true)
    }

    // Update validation state whenever error changes
    updateValidationState(hasError)
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
        setHasTyped(false)
        // Only clear validation state if field was required
        if (required) {
          updateValidationState(false)
        }
      },
      inputNode() {
        return inputRef.current
      }
    }
  })

  const unformatNumber = (formattedNumber: any) => {
    return formattedNumber.replace(/\D/g, "")
  }

  const showFormattedError = (reason = '') => {
    const countryName = itiRef.current.getSelectedCountryData().name
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

    // If field is empty, don't show "too short" error
    if (!inputValue || inputValue.trim() === '') {
      setError('')
      return false
    }

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
    if (!itiInit) return
    if (itiInit.getValidationError() === ValidationError.MissingAreaCode) {
      showFormattedError('missing area code')
      return true
    }
  }

  const validateRepeatCountryCode = (itiInit: any) => {
    if (!itiInit) return
    const countryDialCode = itiInit.getSelectedCountryData().dialCode;
    if (unformatNumber(inputValue).startsWith(countryDialCode)) {
      return showFormattedError('repeat country code')
    }
  }

  // Validation for required empty fields
  const validateRequiredField = () => {
    if (required && (!inputValue || inputValue.trim() === '')) {
      setError('Missing phone number')
      return true
    }
    return false
  }

  const validateErrors = () => {
    // If field is empty, only show required field error if applicable
    if (!inputValue || inputValue.trim() === '') {
      if (validateRequiredField()) return
      // Clear any existing errors if field is empty and not required
      if (!required) {
        setError('')
      }
      return
    }

    if (!hasTyped && !error) return

    if (itiRef.current) isValid(itiRef.current.isValidNumber())
    if (validateOnlyNumbers(itiRef.current)) return
    if (validateTooLongNumber(itiRef.current)) return
    if (validateTooShortNumber(itiRef.current)) return
    if (validateUnhandledError(itiRef.current)) return
    if (validateMissingAreaCode(itiRef.current)) return
    if (validateRepeatCountryCode(itiRef.current)) return
  }

  const getCurrentSelectedData = (itiInit: any, inputValue: string) => {
    return { ...itiInit.getSelectedCountryData(), number: inputValue }
  }

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasTyped) setHasTyped(true)
    setInputValue(evt.target.value)
    let phoneNumberData
    if (formatAsYouType) {
      const formattedPhoneNumberData = getCurrentSelectedData(itiRef.current, evt.target.value)
      phoneNumberData = {...formattedPhoneNumberData, number: unformatNumber(formattedPhoneNumberData.number)}
    } else {
      phoneNumberData = getCurrentSelectedData(itiRef.current, evt.target.value)
    }
    setSelectedData(phoneNumberData)
    onChange(phoneNumberData)
    isValid(itiRef.current.isValidNumber())
  }

  // Separating Concerns as React Docs Recommend
  // This also Fixes things for our react_component rendering on the Rails Side
  useEffect(formatAllCountries, [])

  // If an initial country is not specified, the "globe" icon will show
  // Always set a country
  const fallbackCountry =
    preferredCountries.length > 0 ? preferredCountries[0] :
      onlyCountries.length > 0 ? onlyCountries.sort()[0] :
      excludeCountries.length > 0 ? excludeCountries.sort()[0] :
        "af";

  useEffect(() => {
    const telInputInit = intlTelInput(inputRef.current, {
      separateDialCode: true,
      countryOrder: preferredCountries,
      allowDropdown: !disabled,
      autoInsertDialCode: false,
      initialCountry: initialCountry || fallbackCountry,
      onlyCountries,
      excludeCountries,
      countrySearch: countrySearch,
      fixDropdownWidth: false,
      formatAsYouType: formatAsYouType,
      strictMode: strictMode,
      hiddenInput: hiddenInputs ? () => ({
        phone: `${name}_full`,
        country: `${name}_country_code`,
      }) : null,
    })

    itiRef.current = telInputInit;

    if (inputRef.current) {
      inputRef.current.addEventListener("countrychange", (evt: Event) => {
        const phoneNumberData = getCurrentSelectedData(telInputInit, (evt.target as HTMLInputElement).value)
        setSelectedData(phoneNumberData)
        onChange(phoneNumberData)
        validateErrors()
      })

      inputRef.current.addEventListener("open:countrydropdown", () => setDropDownIsOpen(true))
      inputRef.current.addEventListener("close:countrydropdown", () => setDropDownIsOpen(false))
    }
    if (formatAsYouType) {
      inputRef.current?.addEventListener("input", (evt) => {
        handleOnChange(evt as unknown as React.ChangeEvent<HTMLInputElement>);
      });
    }
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

  let wrapperProps: Record<string, unknown> = {
    className: classes,
    ref: wrapperRef // Add ref to wrapper
  }

  if (!isEmpty(aria)) textInputProps = {...textInputProps, ...ariaProps}
  if (!isEmpty(data)) wrapperProps = {...wrapperProps, ...dataProps}
  if (required) textInputProps.required = true

  return (
    <div
        {...wrapperProps}
        {...htmlProps}
    >
      <TextInput
          ref={inputNode => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(inputNode)
              } else {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputNode
              }
            }
            inputRef.current = inputNode
          }}
          {...textInputProps}
      />
    </div>
  )
}

export default forwardRef(PhoneNumberInput)
