import React from 'react'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#1e3d1eff' },
  { label: 'Blue', value: '#0000FF' },
  { label: 'Purple', value: '#800080' },
  { label: 'Yellow', value: '#FFFF00' },
  { label: 'Pink', value: '#FFC0CB' },
  { label: 'Brown', value: '#A52A2A' },
  { label: 'Black', value: '#000000' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Gray', value: '#808080' },
  { label: 'Cyan', value: '#00FFFF' },
  { label: 'Magenta', value: '#FF00FF' },
  { label: 'Lime', value: '#00FF00' },
  { label: 'Maroon', value: '#800000' },
  { label: 'Olive', value: '#808000' },
  { label: 'Navy', value: '#000080' },
  { label: 'Teal', value: '#008080' },
  { label: 'Silver', value: '#C0C0C0' },
  { label: 'Gold', value: '#FFD700' },
  { label: 'Beige', value: '#F5F5DC' },
  { label: 'Coral', value: '#FF7F50' }
]

const TypeaheadDefaultValue = (props) => {
  return (
    <Typeahead
        defaultValue={options[10]}
        label="Colors"
        options={options}
        {...props}
    />
  )
}

export default TypeaheadDefaultValue
