/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react'

import Button from '../../pb_button/_button'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
  { label: 'Amaranth', value: '#9F2B68' },
  { label: 'Key Lime', value: '#DAF7A6' },
  { label: 'Turquois', value: '#00FFD0' },
]

const TypeaheadCustomMenuList = (props) => {
  const defaultColorOptions = options.slice(0, 3)
  const [colorOptions, setColorOptions] = useState(defaultColorOptions)

  const moreToLoad = colorOptions.length == defaultColorOptions.length
  const loadColors = moreToLoad ? () => setColorOptions(options) : () => setColorOptions(defaultColorOptions)

  const menuListProps = {
    footer: (<Button
        margin="sm"
        onClick={loadColors}
        text={`Load ${moreToLoad ? "More" : "Less"}`}
             />)
  }

  const MenuList = (props) => (
    <Typeahead.MenuList
        {...menuListProps}
        {...props}
    />
  )

  return (
    <Typeahead
        components={{ MenuList }}
        label="Colors"
        options={colorOptions}
        {...props}
    />
  )
}

export default TypeaheadCustomMenuList
