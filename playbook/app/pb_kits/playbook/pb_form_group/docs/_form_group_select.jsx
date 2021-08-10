import React from 'react'

import FormGroup from '../_form_group'

import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupSelect = (props) => {
  const options = [
    { value: 'Country' },
    { value: 'Pop' },
    { value: 'Rock' },
    { value: 'Hip-Hop/Rap' },
    { value: 'Classical' },
    { value: 'Gospel' },
    { value: 'Alternative' },
    { value: 'Indie' },
    { value: 'Other' },
  ]

  return (
    <div>
      <FormGroup>
        <TextInput
            label="Artist"
            placeholder="Enter Artist Name"
            {...props}
        />
        <Select
            blankSelection="Genre"
            options={options}
            {...props}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupSelect
