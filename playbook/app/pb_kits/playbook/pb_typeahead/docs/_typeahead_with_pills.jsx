/* @flow */

import React from 'react'
import { Typeahead } from '../..'

const options = [
  { label: 'Windows', value: '#FFA500' },
  { label: 'Siding', value: '#FF0000' },
  { label: 'Doors', value: '#00FF00' },
  { label: 'Roofs', value: '#0000FF' },
]

const TypeaheadWithPills = () => {
  return (
    <>
      <Typeahead
          isMulti
          label="Colors"
          options={options}
          placeholder=""
      />
    </>
  )
}

export default TypeaheadWithPills
