import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import CreateableSelect from 'react-select/creatable'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { get, isString, uniqueId } from 'lodash'
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
 */

type TypeaheadProps = {
  async?: boolean,
  className?: string,
  components?: GenericObject,
  createable?: boolean,
  dark?: boolean,
  data?: { [key: string]: string },
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label?: string,
  loadOptions?: string | Noop,
  getOptionLabel?: string | (() => any),
  getOptionValue?: string | (() => any),
  name?: string,
  marginBottom?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
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

const Typeahead = ({
  async,
  className,
  components = {},
  createable,
  error = "",
  data = {},
  getOptionLabel,
  getOptionValue,
  htmlOptions = {},
  id,
  loadOptions = noop,
  marginBottom = "sm",
  pillColor,
  ...props
}: TypeaheadProps) => {
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
    onMultiValueClick: (_option: SelectValueType): any => undefined,
    pillColor: pillColor,
    ...props,
  }

  const Tag = (
    createable
      ? (async ? AsyncCreateableSelect : CreateableSelect)
      : (async ? AsyncSelect : Select)
  )

  const handleOnChange = (_data: SelectValueType, { action, option, removedValue }: TagOnChangeValues) => {
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
    }
  }

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    'pb_typeahead_kit react-select',
    `mb_${marginBottom}`,
    globalProps(props),
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
          onChange={handleOnChange}
          {...selectProps}
      />
    </div>
  )
}

Object.keys(kitComponents).forEach((k) => {
  (Typeahead as GenericObject)[k] = (kitComponents as {[key: string]: unknown})[k]
})

export default Typeahead
