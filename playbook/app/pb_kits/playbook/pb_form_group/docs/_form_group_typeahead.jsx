import React from 'react'

import FormGroup from '../_form_group'

import Button from '../../pb_button/_button'
import Typeahead from '../../pb_typeahead/_typeahead'

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
            id="products"
            label="Products"
            options={options}
            {...props}
        />
        <Button
            onClick={() => alert('Button Clicked!')}
            text="Add"
            variant="secondary"
            {...props}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupTypeahead
