import React from 'react'
import { Button, FormGroup, Typeahead } from '../../'

const FormGroupTypeahead = (props) => {
  const options = [
    { label: 'Windows', value: 'windows' },
    { label: 'Roof', value: 'roof' },
    { label: 'Siding', value: 'siding' },
    { label: 'Doors', value: 'doors' },
  ]

  return (
    <div>
      <FormGroup>
        <Typeahead
            label="Products"
            options={options}
        />
        <Button
            onClick={() => alert('Button Clicked!')}
            text="Choose"
            variant="secondary"
            {...props}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupTypeahead
