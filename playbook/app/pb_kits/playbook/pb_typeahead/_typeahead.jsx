/* @flow */

import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import CreateableSelect from 'react-select/creatable'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { get } from 'lodash'
import { globalProps } from '../utilities/globalProps.js'
import classnames from 'classnames'

import Control from './components/Control'
import ClearIndicator from './components/ClearIndicator'
import IndicatorsContainer from './components/IndicatorsContainer'
import MenuList from './components/MenuList'
import MultiValue from './components/MultiValue'
import Option from './components/Option'
import Placeholder from './components/Placeholder'
import ValueContainer from './components/ValueContainer'

import { noop } from '../utilities/props'

/**
 * @typedef {object} Props
 * @prop {boolean} async - whether Typeahead should fetch data from
 * a remote location to populate the options
 * @prop {string} label - the text for the optional typeahead input label
 */

type Props = {
  async?: boolean,
  createable?: boolean,
  dark?: boolean,
  label?: string,
  loadOptions?: noop | string,
  getOptionLabel?: () => any,
  getOptionValue?: () => any,
  name?: string,
}

/**
 * @constant {React.ReactComponent} Typeahead
 * @param {Props} props - props as described at https://react-select.com/props
 */

const Typeahead = (props: Props) => {
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
    },
    defaultOptions: true,
    id: 'react-select-input',
    inline: false,
    isClearable: true,
    isSearchable: true,
    name,
    multiKit: '',
    onCreateOption: null,
    plusIcon: false,
    ...props,
  }

  if (typeof(props.loadOptions) === 'string') selectProps.loadOptions = get(window, props.loadOptions)
  if (typeof(props.getOptionLabel) === 'string') selectProps.getOptionLabel = get(window, props.getOptionLabel)
  if (typeof(props.getOptionValue) === 'string') selectProps.getOptionValue = get(window, props.getOptionValue)

  let Tag = props.async ? AsyncSelect : Select
  if (props.createable) Tag = props.async ? AsyncCreateableSelect : CreateableSelect

  const handleOnChange = (data, { action, option, removedValue }) => {
    if (action === 'select-option') {
      if (selectProps.onMultiValueClick) selectProps.onMultiValueClick(option)
      const multiValueClearEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-option-select`, { detail: option })
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

  const classes = `pb_typeahead_kit react-select ${globalProps(props)}`
  const inlineClass = selectProps.inline ? 'inline' : null

  return (
    <div className={classnames(classes, inlineClass)}>
      <Tag
          classNamePrefix="typeahead-kit-select"
          onChange={handleOnChange}
          {...selectProps}
      />
    </div>
  )
}

export default Typeahead
