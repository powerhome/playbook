import React from 'react'
import { PhoneNumberInput } from '../../'

const PhoneNumberInputOnlyCountries = () => (
  <>
    <PhoneNumberInput onlyCountries={['us', 'br']} />
  </>
)

export default PhoneNumberInputOnlyCountries
