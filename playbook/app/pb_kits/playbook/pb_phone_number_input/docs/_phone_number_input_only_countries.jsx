import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputOnlyCountries = (props) => (
  <>
    <PhoneNumberInput
        id='only'
        onlyCountries={['us', 'br']}
        {...props}
    />
  </>
)

export default PhoneNumberInputOnlyCountries
