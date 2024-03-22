import React from 'react'

import FormGroup from '../_form_group'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'
import Select from '../../pb_select/_select'


const FormGroupPhoneNumberInput = () => {

  const options = [
    { value: 'Cell' },
    { value: 'Home' },
    { value: 'Work' },
  ]

  return (
  <div>
    <FormGroup>
        <Select
            blankSelection="Phone"
            marginBottom="none"
            options={options}
            />
        <PhoneNumberInput
            id='default'
        />
    </FormGroup>
  </div>
)}

export default FormGroupPhoneNumberInput
