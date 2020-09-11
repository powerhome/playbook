// @flow

import React from 'react'
import { Typeahead } from '../../'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadDefault = () => {
  return (
    <Typeahead
        label="Colors"
        options={options}
    />
  )
}

export default TypeaheadDefault
