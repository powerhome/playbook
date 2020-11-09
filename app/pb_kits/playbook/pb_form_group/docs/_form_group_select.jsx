import React from 'react'
import { FormGroup, Select, TextInput } from '../../'

const FormGroupSelect = () => {
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
        />
        <Select
            blankSelection="Select Genre"
            options={options}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupSelect
