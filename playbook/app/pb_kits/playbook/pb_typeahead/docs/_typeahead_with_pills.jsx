/* @flow */

import React from 'react'
import { Typeahead } from 'playbook-ui'

const options = [
  { label: 'Windows', value: '#FFA500' },
  { label: 'Siding', value: '#FF0000' },
  { label: 'Doors', value: '#00FF00' },
  { label: 'Roofs', value: '#0000FF' },
]

const TypeaheadWithPills = (props) => {
  return (
    <>
      <Typeahead
          isMulti
          label="Colors"
          options={options}
          placeholder=""
          {...props}
      />
    </>
  )
}

export default TypeaheadWithPills
