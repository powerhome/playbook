import React from 'react'

import FormGroup from '../_form_group'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'
import Flex from '../../pb_flex/_flex'

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
    <Flex 
        orientation="column" 
        rowGap="md"
    >
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
      <FormGroup>
        <Select
            blankSelection="Phone"
            options={phoneOptions}
            {...props}
        />
        <PhoneNumberInput
            id='default'
            {...props}
        />
    </FormGroup>
    <FormGroup>
      <PhoneNumberInput
          id='default-2'
          {...props}
      />
      <Select
          blankSelection="Phone"
          options={phoneOptions}
          {...props}
      />
    </FormGroup>
    </Flex>
  )
}

export default FormGroupSelect
