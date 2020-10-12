/* @flow */

import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

import Control from './components/Control'
import IndicatorsContainer from './components/IndicatorsContainer'
import MenuList from './components/MenuList'
import MultiValue from './components/MultiValue'
import Option from './components/Option'
import Placeholder from './components/Placeholder'
import ValueContainer from './components/ValueContainer'

/**
 * @typedef {object} Props
 * @prop {boolean} async - whether Typeahead should fetch data from
 * a remote location to populate the options
 * @prop {string} label - the text for the optional typeahead input label
 */

type Props = {
  async?: boolean,
  label?: string,
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
    ...props,
  }

  const Tag = props.async ? AsyncSelect : Select

  return (
    <div className="pb_typeahead_kit react-select">
      <Tag {...selectProps} />
    </div>
  )
}

export default Typeahead
