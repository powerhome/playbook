/* @flow */

import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { get } from 'lodash'

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
  label?: string,
  loadOptions?: noop | string,
  name?: string,
}

/**
 * @constant {React.ReactComponent} Typeahead
 * @param {Props} props - props as described at https://react-select.com/props
 */

const Typeahead = (props: Props) => {
  const selectProps = {
    cacheOptions: true,
    defaultOptions: true,
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
    isClearable: true,
    isSearchable: true,
    name,
    ...props,
  }

  if (typeof(props.loadOptions) === 'string') selectProps.loadOptions = get(window, props.loadOptions)

  const Tag = props.async ? AsyncSelect : Select

  const handleOnChange = (data, { action, option, removedValue }) => {
    if (action === 'select-option') {
      if (selectProps.onMultiValueClick) selectProps.onMultiValueClick(option)
      const multiValueClearEvent = new CustomEvent('pb-typeahead-kit-result-option-select', { detail: option })
      document.dispatchEvent(multiValueClearEvent)
    }
    if (action === 'remove-value' || action === 'pop-value') {
      const multiValueRemoveEvent = new CustomEvent('pb-typeahead-kit-result-option-remove', { detail: removedValue })
      document.dispatchEvent(multiValueRemoveEvent)
    }
    if (action === 'clear') {
      const multiValueClearEvent = new CustomEvent('pb-typeahead-kit-result-clear')
      document.dispatchEvent(multiValueClearEvent)
    }
  }

  return (
    <div className="pb_typeahead_kit react-select">
      <Tag
          onChange={handleOnChange}
          {...selectProps}
      />
    </div>
  )
}

export default Typeahead
