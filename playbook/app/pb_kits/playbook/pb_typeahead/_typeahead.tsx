import React, { useState, useEffect, forwardRef, useRef} from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import CreateableSelect from 'react-select/creatable'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { get, isString, uniqueId } from '../utilities/object'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import classnames from 'classnames'

import {
  Control,
  ClearIndicator,
  IndicatorsContainer,
  MenuList,
  MultiValue,
  Option,
  Placeholder,
  ValueContainer,
} from "./components"

import * as kitComponents from "./components"

import { noop, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GenericObject, Noop } from '../types'

/**
 * @typedef {object} Props
 * @prop {boolean} async - whether Typeahead should fetch data from
 * a remote location to populate the options
 * @prop {string} label - the text for the optional typeahead input label
 * @prop {boolean} preserveSearchInput - whether to preserve the input value when the field loses focus
 */

type TypeaheadProps = {
  async?: boolean,
  className?: string,
  components?: GenericObject,
  createable?: boolean,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label?: string,
  loadOptions?: string | Noop,
  getOptionLabel?: string | (() => string),
  getOptionValue?: string | (() => string),
  name?: string,
  options?: Array<{ label: string; value?: string }>,
  marginBottom?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
  onChange?: any,
  optionsByContext?: Record<string, Array<{ label: string; value?: string }>>
  required?: boolean,
  validation?: { message: string },
  searchContextSelector?: string,
  clearOnContextChange?: boolean,
  preserveSearchInput?: boolean,
} & GlobalProps

export type SelectValueType = {
  label: string,
  value: string,
  imageUrl?: string,
  pillColor?: string,
}

type TagOnChangeValues = {
  action?: string,
  option?: SelectValueType,
  removedValue?: string,
}

/**
 * @constant {React.ReactComponent} Typeahead
 * @param {TypeaheadProps} props - props as described at https://react-select.com/props
 */
const Typeahead = forwardRef<HTMLInputElement, TypeaheadProps>(({
  async,
  className,
  components = {},
  createable,
  error = "",
  data = {},
  disabled = false,
  getOptionLabel,
  getOptionValue,
  htmlOptions = {},
  id,
  name,
  loadOptions = noop,
  marginBottom = "sm",
  pillColor,
  onChange,
  optionsByContext = {},
  searchContextSelector,
  required = false,
  validation,
  clearOnContextChange = false,
  preserveSearchInput = false, // Default to false to maintain backward compatibility
  ...props
}: TypeaheadProps) => {
  // State to manage the input value when preserveSearchInput is true
  const [inputValue, setInputValue] = useState("")
  // State to track if form has been submitted to control validation display for react rendered rails kit
  const [formSubmitted, setFormSubmitted] = useState(false)
  // State to track if user has made a selection (to disable defaultValue focus behavior)
  const [hasUserSelected, setHasUserSelected] = useState(false)

  // If preserveSearchInput is true, we need to control the input value
  const handleInputChange = preserveSearchInput
    ? (newValue: string, actionMeta: {action: string}) => {
        // Only update the input value for certain actions
        if (actionMeta.action === 'input-change') {
          setInputValue(newValue)
        } else if (actionMeta.action === 'menu-close' && !props.value) {
          // Don't clear the input when the menu closes without a selection
          // unless the component is controlled and has a value
        } else if (actionMeta.action === 'set-value') {
          // When an option is selected, clear the input
          setInputValue('')
        }

        // If the original onInputChange was provided, call it too
        if (props.onInputChange) {
          return props.onInputChange(newValue, actionMeta)
        }
        return newValue
      }
    : props.onInputChange

  // Handle blur events if we're preserving input
  const handleBlur = preserveSearchInput
    ? (event: React.FocusEvent<HTMLInputElement>) => {
        // Do not clear input on blur - the value is preserved in our state
        if (props.onBlur) {
          props.onBlur(event)
        }
      }
    : props.onBlur

  // Create a ref to access React Select instance
  const selectRef = useRef<any>(null)

  // Configure focus on selected option using React Select's API
  const handleMenuOpen = () => {
    setTimeout(() => {
      let currentValue = props.value || props.defaultValue

      // Handle react rendered rails version which passes arrays even for single selects
      if (Array.isArray(currentValue) && currentValue.length > 0) {
        currentValue = currentValue[0]
      }
      
      // Only apply custom focus if user has NOT made a selection yet
      if (currentValue && selectRef.current && !hasUserSelected) {

        const options = props.options
        if (options) {
          // Find the index of the current value
          const focusedIndex = options.findIndex((option: any) => {
            const optionValue = props.getOptionValue ? props.getOptionValue(option) : option.value
            const currentOptionValue = props.getOptionValue ? props.getOptionValue(currentValue) : currentValue.value
            return optionValue === currentOptionValue
          })
          
          if (focusedIndex >= 0 && options[focusedIndex]) {
            // Use React Select's internal state to set focused option
            if (selectRef.current && selectRef.current.setState) {
              const targetOption = options[focusedIndex]
              selectRef.current.setState({
                focusedOption: targetOption,
                focusedValue: null
              })
              
              // Handle scrolling so selected option is visible
              setTimeout(() => {
                if (selectRef.current && selectRef.current.menuListRef) {
                  const menuElement = selectRef.current.menuListRef
                  if (menuElement && menuElement.children && menuElement.children[focusedIndex]) {
                    // Calculate the position of the selected option and scroll the menu container
                    const optionElement = menuElement.children[focusedIndex] as HTMLElement
                    const optionTop = optionElement.offsetTop
                    const optionHeight = optionElement.offsetHeight
                    const menuHeight = menuElement.clientHeight
                    
                    // Set the menu's scrollTop to position the selected option in the middle
                    const scrollToMiddle = optionTop - (menuHeight / 2) + (optionHeight / 2)
                    menuElement.scrollTop = Math.max(0, scrollToMiddle)
                  }
                }
              }, 20)
            }
          }
        }
      }
    }, 0)
    
    // Call original onMenuOpen if provided
    if (props.onMenuOpen) {
      props.onMenuOpen()
    }
  }

  const selectProps = {
    cacheOptions: true,
    required,
    components: {
      Control,
      ClearIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null as null,
      MenuList,
      MultiValue,
      Option,
      Placeholder,
      ValueContainer,
      ...components
    },
    loadOptions: isString(loadOptions) ? get(window, loadOptions) : loadOptions,
    getOptionLabel: isString(getOptionLabel) ? get(window, getOptionLabel) : getOptionLabel,
    getOptionValue: isString(getOptionValue) ? get(window, getOptionValue) : getOptionValue,
    defaultOptions: true,
    id: id || uniqueId(),
    inline: false,
    isClearable: true,
    isSearchable: true,
    name,
    multiKit: '',
    onCreateOption: null as null,
    plusIcon: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMultiValueClick: (_option: SelectValueType): any => undefined,
    pillColor: pillColor,
    ...(preserveSearchInput ? { inputValue } : {}),
    onInputChange: handleInputChange,
    onBlur: handleBlur,
    onMenuOpen: handleMenuOpen,
    ...props,
  }

  const [contextValue, setContextValue] = useState("")

  // Add listener for form validation to track when validation should be shown (needed for react rendered rails kit)
  useEffect(() => {
    const handleInvalid = (event: Event) => {
      const target = event.target as HTMLInputElement
      const typeaheadContainer = target.closest('[data-pb-react-component="Typeahead"]')

      if (typeaheadContainer) {
        // Check if this invalid event is specifically for our typeahead by comparing names so we do not have to require ids
        const invalidInputName = target.name || target.getAttribute('name')
        if (invalidInputName === name) {
          setFormSubmitted(true)
        }
      }
    }
    document.addEventListener('invalid', handleInvalid, true)
    
    return () => {
      document.removeEventListener('invalid', handleInvalid, true)
    }
  }, [name])

  // Add listener for clearing
  useEffect(() => {
    const handleClear = () => {
      if (preserveSearchInput) {
        setInputValue('')
      }
    }

    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, handleClear)

    return () => {
      document.removeEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, handleClear)
    }
  }, [selectProps.id, preserveSearchInput])

  useEffect(() => {
    if (searchContextSelector) {
      const searchContextElement = document.getElementById(searchContextSelector)

      setContextValue((searchContextElement as HTMLInputElement)?.value)
      const handleContextChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setContextValue(target.value);
        if (clearOnContextChange) {
          document.dispatchEvent(new CustomEvent(`pb-typeahead-kit-${selectProps.id}:clear`))
          if (preserveSearchInput) {
            setInputValue('')
          }
        }
      }

      if (searchContextElement) searchContextElement.addEventListener('change', handleContextChange)

      return () => {
        if (searchContextElement) searchContextElement.removeEventListener('change', handleContextChange)
      }
    }
  }, [searchContextSelector, clearOnContextChange, selectProps.id, preserveSearchInput])

  const contextArray = optionsByContext[contextValue]
  if (Array.isArray(contextArray) && contextArray.length > 0) {
    selectProps.options = contextArray
  }

  const Tag = (
    createable
      ? (async ? AsyncCreateableSelect : CreateableSelect)
      : (async ? AsyncSelect : Select)
  )

  const handleOnChange = (_data: SelectValueType, { action, option, removedValue }: TagOnChangeValues) => {
    if (onChange) {
      const isReactHookForm = onChange.toString().includes("target")
      if (isReactHookForm) {
        onChange({ target: { name, value: _data } })
      } else {
        onChange(_data)
      }
    }

    // Reset form submitted state when a selection is made (this is all for react rendered rails kit)
    if (action === 'select-option') {
      setFormSubmitted(false)
      // Mark that user has made a selection to disable default value focus behavior
      setHasUserSelected(true)
    }

    // If a value is selected and we're preserving input on blur, clear the input
    if (action === 'select-option' && preserveSearchInput) {
      setInputValue('')
    }

    if (action === 'select-option') {
      if (selectProps.onMultiValueClick && option) selectProps.onMultiValueClick(option)
      const multiValueClearEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-option-select`, { detail: option ? option : _data })
      document.dispatchEvent(multiValueClearEvent)
    }
    if (action === 'remove-value' || action === 'pop-value') {
      const multiValueRemoveEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-option-remove`, { detail: removedValue })
      document.dispatchEvent(multiValueRemoveEvent)
    }
    if (action === 'clear') {
      const multiValueClearEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-clear`)
      document.dispatchEvent(multiValueClearEvent)
      // If preserving input on blur, also clear input on explicit clear
      if (preserveSearchInput) {
        setInputValue('')
      }
    }
  }

  const filteredProps: TypeaheadProps = {...props}
  delete filteredProps.truncate

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    'pb_typeahead_kit react-select',
    `mb_${marginBottom}`,
    globalProps(filteredProps),
    className
  )

  const inlineClass = selectProps.inline ? 'inline' : null

  const shouldShowValidationError = required && 
                                   formSubmitted

  const errorDisplay = error || (shouldShowValidationError ? validation?.message || "Please fill out this field." : "")

  return (
    <div
        {...dataProps}
        {...htmlProps}
        className={classnames(classes, inlineClass)}
    >
      <Tag
          classNamePrefix="typeahead-kit-select"
          error={errorDisplay}
          isDisabled={disabled}
          onChange={handleOnChange}
          ref={selectRef}
          {...selectProps}
      />
    </div>
  )
})

Object.keys(kitComponents).forEach((k) => {
  (Typeahead as GenericObject)[k] = (kitComponents as {[key: string]: unknown})[k]
})

Typeahead.displayName = 'Typeahead'
export default Typeahead
