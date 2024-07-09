// @flow

import React from 'react'
import { Typeahead } from 'playbook-ui'

const options = [
  { label: 'Jardim', value: 'Portuguese' },
  { label: 'Garten', value: 'German' },
  { label: 'Giardino', value: 'Italian' },
  { label: 'Jardín', value: 'Spanish' },
]

const TypeaheadCreateable = (props) => {
  return (
    <Typeahead
        createable
        isMulti
        label="User Created Options"
        options={options}
        {...props}
    />
  )
}

export default TypeaheadCreateable
