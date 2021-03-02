/* @flow */

import React, { useState } from 'react'
import { Typeahead } from '../..'

const initOptions = [
  { label: 'Windows', value: '#FFA500' },
  { label: 'Siding', value: '#FF0000' },
  { label: 'Doors', value: '#00FF00' },
  { label: 'Roofs', value: '#0000FF' },
]

const TypeaheadWithPills = (props) => {
  const [values, setValues] = useState([])
  return (
    <>
      <Typeahead
          badges
          createable
          isMulti
          label="Colors"
          onChange={(value) => console.log(value)}
          options={initOptions}
          placeholder=""
          {...props}
      />
    </>
  )
}

export default TypeaheadWithPills
