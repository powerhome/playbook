import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputExcludeCountries = (props) => (
  <>
    <PhoneNumberInput
        excludeCountries={['us', 'br']}
        id='exclude'
        initialCountry='gb'
        {...props}
    />
  </>
)

export default PhoneNumberInputExcludeCountries
