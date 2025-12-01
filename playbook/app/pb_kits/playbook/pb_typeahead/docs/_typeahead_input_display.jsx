import React from 'react'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
  { label: 'Yellow', value: '#FFFF00' },
  { label: 'Purple', value: '#800080' },
  { label: 'Cyan', value: '#00FFFF' },
  { label: 'Magenta', value: '#FF00FF' }
]

const TypeaheadInputDisplay = (props) => {
  return (
    <Typeahead
        inputDisplay="none"
        isMulti
        label="Colors"
        options={options}
        {...props}
    />
  )
}

export default TypeaheadInputDisplay