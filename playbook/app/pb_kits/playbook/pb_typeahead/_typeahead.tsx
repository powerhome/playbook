import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import CreateableSelect from 'react-select/creatable'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { get, isString, uniqueId } from 'lodash'
import { globalProps } from '../utilities/globalProps'
import classnames from 'classnames'

import Control from './components/Control'
import ClearIndicator from './components/ClearIndicator'
import IndicatorsContainer from './components/IndicatorsContainer'
import MenuList from './components/MenuList'
import MultiValue from './components/MultiValue'
import Option from './components/Option'
import Placeholder from './components/Placeholder'
import ValueContainer from './components/ValueContainer'

import { noop, buildDataProps } from '../utilities/props'
import { Noop } from '../types'

/**
 * @typedef {object} Props
 * @prop {boolean} async - whether Typeahead should fetch data from
 * a remote location to populate the options
 * @prop {string} label - the text for the optional typeahead input label
 */

type TypeaheadProps = {
  async?: boolean,
  className?: string,
  components?: object,
  createable?: boolean,
  dark?: boolean,
  data?: {[key: string]: string},
  error?: string,
  id?: string,
  label?: string,
  loadOptions?: string | Noop,
  getOptionLabel?: string | (() => any),
  getOptionValue?: string | (() => any),
  name?: string,
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
  id,
  loadOptions = noop,
  ...props
}: TypeaheadProps) => {
  const selectProps = {
    cacheOptions: true,
    components: {
      Control,
      ClearIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null,
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
    onCreateOption: null,
    plusIcon: false,
    onMultiValueClick: (option: { label: string, value: string }) => { },
    ...props,
  }

  const Tag = (
    createable
      ? (async ? AsyncCreateableSelect : CreateableSelect)
      : (async ? AsyncSelect : Select)
  )

  const handleOnChange = (_data, { action, option, removedValue }) => {
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
  const classes = classnames(
    'pb_typeahead_kit react-select',
    globalProps(props),
    className
  )

  const inlineClass = selectProps.inline ? 'inline' : null

  return (
    <div {...dataProps}
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

export default Typeahead
