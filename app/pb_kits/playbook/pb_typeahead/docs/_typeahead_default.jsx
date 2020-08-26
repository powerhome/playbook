// @flow

import React from 'react'
import { TypeAhead } from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeAheadDefault = () => {
  return (
    <TypeAhead options={options} />
  )
}

export default TypeAheadDefault
