// @flow

import React from 'react'
import { Typeahead } from '../../'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadInline = (props) => {
  return (
    <Typeahead
        inline
        isMulti
        label="Colors"
        options={options}
        {...props}
    />
  )
}

export default TypeaheadInline
