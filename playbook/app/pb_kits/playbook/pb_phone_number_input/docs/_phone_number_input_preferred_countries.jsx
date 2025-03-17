import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputPreferredCountries = (props) => (
  <>
    <PhoneNumberInput
        id='preferred'
        preferredCountries={['us', 'br', 'ph', 'gb']}
        {...props} 
    />
  </>
)

export default PhoneNumberInputPreferredCountries
