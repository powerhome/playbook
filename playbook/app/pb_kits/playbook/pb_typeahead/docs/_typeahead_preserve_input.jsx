import React from 'react'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadPreserveInput = (props) => {
  return (
    <Typeahead
        label="Colors"
        options={options}
        preserveSearchInput
        {...props}
    />
  )
}

export default TypeaheadPreserveInput
