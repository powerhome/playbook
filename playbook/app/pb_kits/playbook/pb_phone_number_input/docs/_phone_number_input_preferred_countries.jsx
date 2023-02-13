import React from 'react'
import { PhoneNumberInput } from '../../'

const PhoneNumberInputPreferredCountries = () => (
  <>
    <PhoneNumberInput preferredCountries={['us', 'br', 'ph', 'gb']} />
  </>
)

export default PhoneNumberInputPreferredCountries
