import React from 'react'

import FormGroup from '../_form_group'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'
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

  const phoneOptions = [
    { value: 'Cell' },
    { value: 'Work' },
    { value: 'Home' },
  ]

  return (
    <div>
      <FormGroup>
        <TextInput
            placeholder="Enter Artist Name"
            {...props}
        />
        <Select
            blankSelection="Genre"
            options={options}
            {...props}
        />
      </FormGroup>
      <br />
      <br />
      <FormGroup>
        <Select
            blankSelection="Phone"
            options={phoneOptions}
            />
        <PhoneNumberInput
            id='default'
        />
    </FormGroup>
    <br />
    <br />
    <FormGroup>
      <PhoneNumberInput
          id='default-2'
      />
      <Select
          blankSelection="Phone"
          options={phoneOptions}
      />
    </FormGroup>
    </div>
  )
}

export default FormGroupSelect
