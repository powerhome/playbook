import React, { useState, useEffect, forwardRef} from 'react'
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
  clearOnContextChange = false,
  preserveSearchInput = false, // Default to false to maintain backward compatibility
  ...props
}: TypeaheadProps) => {
  // State to manage the input value when preserveSearchInput is true
  const [inputValue, setInputValue] = useState("")

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

  const selectProps = {
    cacheOptions: true,
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
    ...props,
  }

  const [contextValue, setContextValue] = useState("")

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

    // If a value is selected and we're preserving input on blur, clear the input
    if (action === 'select-option' && preserveSearchInput) {
      setInputValue('')
    }

    if (action === 'select-option') {
      if (selectProps.onMultiValueClick) selectProps.onMultiValueClick(option)
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

  return (
    <div
        {...dataProps}
        {...htmlProps}
        className={classnames(classes, inlineClass)}
    >
      <Tag
          classNamePrefix="typeahead-kit-select"
          error={error}
          isDisabled={disabled}
          onChange={handleOnChange}
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
