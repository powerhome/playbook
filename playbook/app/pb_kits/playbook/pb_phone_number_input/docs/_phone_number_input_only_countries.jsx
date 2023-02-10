import React from 'react'
import PhoneNumberInput from '../_phone_number_input'

const PhoneNumberInputOnlyCountries = () => (
  <>
    <PhoneNumberInput onlyCountries={['us', 'br']} />
  </>
)

export default PhoneNumberInputOnlyCountries
