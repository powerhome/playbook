import React from 'react'
import { FormGroup, Select, TextInput } from '../../'

const FormGroupSelect = () => {
  const options = [
    { value: 'PHL' },
    { value: 'NJ' },
    { value: 'MD' },
    { value: 'LI' },
    { value: 'BOS' },
    { value: 'ATL' },
    { value: 'CT' },
    { value: 'CHI' },
    { value: 'DET' },
    { value: 'HOU' },
    { value: 'AUS' },
    { value: 'DAL' },
    { value: 'TPA' },
    { value: 'DEN' },
    { value: 'CLT' },
    { value: 'NSH' },
  ]

  return (
    <div>
      <FormGroup>
        <TextInput
            label="Zip Code"
            placeholder="Enter Zip Code"
        />
        <Select
            blankSelection="Select One"
            label="Territory"
            options={options}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupSelect
